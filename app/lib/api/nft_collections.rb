module Api
  class NftCollections
    def self.nft_collections(owner_address, page)
      response = Rails.cache.fetch "#{owner_address}_assets", expires_in: 1.minutes do
        send_request(Rails.application.credentials.config[:opensea_url] + "/api/v1/assets?owner=#{owner_address}")
      end
      if response
        response_body = response["assets"]
        user = User.find_by(address: owner_address)
        user_collections = user.imported_collections.includes(:nft_contract).pluck(:token, 'nft_contracts.address')
        next_page = response_body.length == 15
        response_body.map! do |resp|
          status = user_collections.select { |c| c.first == resp["token_id"] && c.last.downcase == resp["asset_contract"]["address"].downcase }.present?
          unless status
            {
              type: resp["asset_contract"]["schema_name"],
              title: resp["name"],
              description: resp["description"],
              image_url: resp["image_url"],
              metadata: resp["token_metadata"],
              token: resp["token_id"],
              contract_address: resp["asset_contract"]["address"]
            } #unless resp["token_metadata"].nil?
          end
        end
        { collections: response_body.compact, next_page: next_page }
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
