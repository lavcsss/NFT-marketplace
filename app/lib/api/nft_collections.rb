require "uri"
require "net/http"
include UsersHelper

module Api
  class NftCollections
    def self.nft_collections(owner_address, page)
      items_per_page = 9
      end_range = (page.to_i * items_per_page) - 1
      start_index = end_range - (items_per_page - 1)
      base_url = Rails.application.credentials.config[:alchemy][:base_url]
      api_key = Rails.application.credentials.config[:alchemy][:api_key]
      # start = Time.now
      api_url = base_url + "/nft/v2/#{api_key}/getNFTs?owner=#{owner_address}"
      response = Rails.cache.fetch "#{owner_address}_assets", expires_in: 1.minutes do
        send_request(api_url)
      end
      if response
        response_body = response["ownedNfts"]
        response_body.reverse!
        user = User.find_by(address: owner_address)
        user_collections = user.collections.includes(:nft_contract)
        filtered_res = []
        response_body.map! do |resp|
          token_id = resp["id"]["tokenId"].to_i(16)
          contract_address = resp["contract"]["address"]
          status = user_collections.where(token: token_id, 'nft_contracts.address': contract_address).present?
          # status = user_collections.select { |c| c.first == token_id && c.last.downcase == contract_address.downcase }.present?
          unless status
            if resp["media"][0]["raw"].present? or ["ERC1155"].include?(resp["id"]["tokenMetadata"]["tokenType"])
               filtered_res.append(resp)
            end
          end
        end
        total_count = filtered_res.length()
        filtered_res = filtered_res[start_index..end_range]
        filtered_res.map! do |resp|
          token_id = resp["id"]["tokenId"].to_i(16)
          contract_address = resp["contract"]["address"]
          if resp["media"][0]["raw"].present?
            {
              type: resp["id"]["tokenMetadata"]["tokenType"],
              title: resp["title"],
              description: resp["description"],
              image_url: resp["media"][0]["raw"],
              metadata: resp["metadata"],
              token: token_id,
              contract_address: contract_address,
              contract_symbol: resp["id"]["tokenMetadata"]["tokenType"],
              balance: resp["balance"]
            }
          else
            if ["ERC1155"].include?(resp["id"]["tokenMetadata"]["tokenType"])
              asset_response = fetch_nftmetadata(user, contract_address, token_id)
              if asset_response.nil?
                obj = Utils::Web3.new
                metadata_url = obj.get_nftmetadata(contract_address, token_id)
                begin
                  url = URI(metadata_url)
                  https = Net::HTTP.new(url.host, url.port)
                  https.use_ssl = true
                  https.read_timeout = 10
                  request = Net::HTTP::Get.new(url)
                  response = https.request(request)
                  asset_response = eval(response.read_body)
                  save_nftmetadata(asset_response, user, contract_address, token_id)
                rescue Net::ReadTimeout => e
                  Rails.logger.warn "################## Exception while reading NFT metadata ##################"
                  Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
                  Rails.logger.warn $!.backtrace[0..20].join("\n")
                  next
                end
              end
              {
                type: resp["id"]["tokenMetadata"]["tokenType"],
                title: asset_response[:name],
                description: asset_response[:description],
                image_url: asset_response[:image],
                metadata: asset_response,
                token: token_id,
                contract_address: contract_address, 
                contract_symbol: resp["id"]["tokenMetadata"]["tokenType"],
                balance: resp["balance"]
              }
            end
          end
        end
        # finish = Time.now
        # diff = finish - start
        {collections: filtered_res.compact, total_pages: (total_count.to_f / items_per_page.to_f).ceil }
      else
        ''
      end
      
    end

    def self.send_request(url)
      begin
        uri = URI.parse(url)
        request = Net::HTTP::Get.new(uri)
        request.content_type = "application/json"
        req_options = {
          use_ssl: uri.scheme == "https",
          open_timeout: 5,
          read_timeout: 5,
        }
        response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
          http.request(request)
        end

        if response.code == '200'
          JSON.parse(response.body)
        else
          Rails.logger.warn "#########################################################"
          Rails.logger.warn "Failed while fetch assets - #{response}"
          Rails.logger.warn "#########################################################"
          false
        end
      rescue Exception => e
        Rails.logger.warn "################## Exception while Fetching Collection(s) from Opensea ##################"
        Rails.logger.warn "ERROR: #{e.message}"
        Rails.logger.warn $!.backtrace[0..20].join("\n")
      end
    end
  end
end
