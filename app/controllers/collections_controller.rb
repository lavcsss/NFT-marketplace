class CollectionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:show]
  #before_action :is_approved, only: [:show]
  before_action :is_approved, except: [:show]
  # before_action :set_collection, only: [:show, :bid, :execute_max_bid, :remove_from_sale, :execute_bid, :buy]
  before_action :set_collection, except: [:new, :create, :update_token_id, :sign_metadata_hash]

  skip_before_action :verify_authenticity_token
  include CollectionsHelper

  def new
    @collection_type = params[:type]
    if params[:contract_address] && params[:token]
      begin
        asset_response = JSON.parse(URI.open(Rails.application.credentials.config[:opensea_url] + "/api/v1/asset/#{params[:contract_address]}/#{params[:token]}").read)
        if asset_response["top_ownerships"]
          contract_symbol = asset_response["asset_contract"]["symbol"]
          contract_type = (contract_symbol.include?("NFT1155") || contract_symbol.include?("NFT721")) ? "Shared" : "Own"
          num_of_copy = asset_response["top_ownerships"].find { |resp| resp["owner"]["address"].downcase == current_user.address.downcase }.try(:fetch, "quantity")
          if params[:nft]
            data = JSON.parse(URI.open(params[:nft]).read)
          else
            data = { }
            data["name"] = asset_response["name"]
            data["description"] = asset_response["description"]
            data["image"] = asset_response["image_url"]
          end

          @nft = {
            title: data["name"],
            description: data["description"],
            metadata: params[:nft],
            token: params[:token],
            contract_type: contract_type,
            num_copies: num_of_copy,
            contract_address: params[:contract_address]
          }

          OpenURI::Buffer.send :remove_const, 'StringMax' if OpenURI::Buffer.const_defined?('StringMax')
          OpenURI::Buffer.const_set 'StringMax', 0
          if data.has_key?("animation_url")
            file = URI.open(asset_response['animation_url'])
            @nft.merge!({
              url: asset_response['animation_url'],
              file_path: file.path,
              file_type: file.content_type,
              preview_url: asset_response['image_url']
            })
          elsif data.has_key?("image")
            image = data['image'].match(/ipfs:\/\/ipfs/).present? ? asset_response['image_url'] : data["image"]
            file = URI.open(image)
            @nft.merge!({
              url: image,
              file_path: file.path,
              file_type: file.content_type
            })
          elsif data.has_key?("image_url")
            file = URI.open("https://ipfs.io/ipfs/" + data["image_url"].split("://")[1])
            @nft.merge!({
              url: "https://ipfs.io/ipfs/" + data["image_url"].split("://")[1],
              file_path: file.path,
              file_type: file.content_type
            })
          end
        else
          raise "Unable to fetch the asset details"
        end
     rescue Exception => e
        Rails.logger.warn "################## Exception while reading Opensea Collection file ##################"
        redirect_to user_path(id: current_user.address, tab: 'nft_collections')
      end
    end
  end

  def show
    @collection.update_imported_nft if @collection.imported?
    @tab = params[:tab]
    @activities = PaperTrail::Version.where(item_type: "Collection", item_id: @collection.id).order("created_at desc")
    @max_bid = @collection.max_bid
    set_collection_gon
  end

  def create
    begin
      # ActiveRecord::Base.transaction do
        @collection = Collection.new(collection_params.except(:source, :nft_link, :token, :total_copies, :contract_address, :contract_type))
        @collection.state = :pending
        if collection_params[:source] == "opensea"
          @collection.state = :approved
          asset_response = JSON.parse(URI.open(Rails.application.credentials.config[:opensea_url] + "/api/v1/asset/#{collection_params[:contract_address]}/#{collection_params[:token]}").read)
          if collection_params[:nft_link].present?
            data = JSON.parse(URI.open(collection_params[:nft_link]).read)
            OpenURI::Buffer.send :remove_const, 'StringMax' if OpenURI::Buffer.const_defined?('StringMax')
            OpenURI::Buffer.const_set 'StringMax', 0
          else
            data = { }
            data["name"] = asset_response["name"]
            data["description"] = asset_response["description"]
            data["image"] = asset_response["image_url"]
          end

          if data["animation_url"]
            file = URI.open(asset_response["animation_url"])
          elsif data["image_url"]
            file = URI.open("https://ipfs.io/ipfs/" + data["image_url"].split("://")[1])
          else
            image = data['image'].match(/ipfs:\/\/ipfs/).present? ? asset_response['image_url'] : data["image"]
            file = URI.open(image)
          end
          @collection.name = data['name']
          unless @collection.nft_contract.address == collection_params[:contract_address]
            @collection.nft_contract = NftContract.find_or_create_by(contract_type: @collection.nft_contract.contract_type, symbol: collection_params[:contract_type], address: collection_params[:contract_address])
          end
          @collection.royalty = 0
          @collection.token = collection_params[:token]
          @collection.no_of_copies = collection_params[:total_copies]
          @collection.owned_tokens = collection_params[:no_of_copies].present? ? collection_params[:no_of_copies] : collection_params[:total_copies]
          @collection.description = data["description"]
          @collection.attachment.attach(io: file, filename: data["name"], content_type: file.content_type)
          # for music and video if no cover added then we add default banner image as cover
          if ['audio/mp3', 'audio/webm', 'audio/mpeg', 'video/mp4', 'video/webm'].include?(file.content_type) && !@collection.cover.present?
            if data.has_key?("animation_url")
              preview_file = URI.open(asset_response["image_url"])
              @collection.cover.attach(io: preview_file, filename: data["name"], content_type: preview_file.content_type)
            else
              @collection.cover.attach(io: File.open('app/assets/images/banner-1.png'), filename: 'banner-1.png')
            end
          end
        else
          @collection.owned_tokens = @collection.no_of_copies
        end
        # ITS A RAND STRING FOR IDENTIFIYING THE COLLECTION. NOT CONTRACT ADDRESS
        @collection.address = Collection.generate_uniq_token
        @collection.creator_id = current_user.id
        @collection.owner_id = current_user.id
        @collection.data = JSON.parse(collection_params[:data]) if collection_params[:data].present?
        if @collection.valid?
          @collection.save
          @metadata_hash = Api::Pinata.new.upload(@collection)
          # PaperTrail.request(enabled: false) { @collection.approve! }
        else
          @errors = @collection.errors.full_messages
        end
      # end
    rescue Exception => e
      Rails.logger.warn "################## Exception while creating collection ##################"
      Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
      Rails.logger.warn $!.backtrace[0..20].join("\n")
      @errors = e.message
    end
  end

  def bid
    begin
      @collection.place_bid(bid_params)
    rescue Exception => e
      Rails.logger.warn "################## Exception while creating BID ##################"
      Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
      Rails.logger.warn $!.backtrace[0..20].join("\n")
      @errors = e.message
    end
  end

  def remove_from_sale
    if @collection.is_owner?(current_user)
      @collection.remove_from_sale
      @collection.cancel_bids
    end
    redirect_to collection_path(@collection.address)
  end

  def sell
    begin
      ActiveRecord::Base.transaction do
        lazy_minted = lazy_mint_token_update
        @redirect_address = @collection.execute_bid(params[:address], params[:bid_id], params[:transaction_hash], lazy_minted) if @collection.is_owner?(current_user)
      end
    rescue Exception => e
      Rails.logger.warn "################## Exception while selling collection ##################"
      Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
      Rails.logger.warn $!.backtrace[0..20].join("\n")
      @errors = e.message
    end
  end

  def buy
    begin
      ActiveRecord::Base.transaction do
        lazy_minted = lazy_mint_token_update
        @redirect_address = @collection.direct_buy(current_user, params[:quantity].to_i, params[:transaction_hash], lazy_minted)
      end
    rescue Exception => e
      Rails.logger.warn "################## Exception while buying collection ##################"
      Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
      Rails.logger.warn $!.backtrace[0..20].join("\n")
      @errors = e.message
    end
  end

  def update_token_id
    collection = current_user.collections.unscoped.where(address: params[:collectionId]).take
    collection.approve! unless collection.instant_sale_enabled
    collection.update(token: params[:tokenId].to_i, transaction_hash: params[:tx_id])
  end

  def change_price
    @collection.assign_attributes(change_price_params)
    @collection.save
  end

  def burn
    if @collection.multiple?
      all_collections = Collection.where(nft_contract_id: @collection.nft_contract_id, token: @collection.token)
      #Using UPDATE_ALL to FORCE-skip cases where no_of_copies > owned_tokens for a brief moment 
      all_collections.update_all(:no_of_copies => @collection.no_of_copies - params[:transaction_quantity].to_i)
      if @collection.owned_tokens == params[:transaction_quantity].to_i #User has 2 actions, BURN ALL vs BURN some!
        @collection.burn! if @collection.may_burn?
      else
        @collection.update(:owned_tokens => @collection.owned_tokens - params[:transaction_quantity].to_i)
      end 
    else   
      @collection.burn! if @collection.may_burn?
    end
  end

  def transfer_token
    new_owner = User.find_by_address(params[:user_id])
    if new_owner.present?
      @collection.hand_over_to_owner(new_owner.id)
    else
      @errors = [t("collections.show.invalid_user")]
    end
  end

  def sign_metadata_hash
    sign = if params[:contract_address].present?
      collection = current_user.collections.unscoped.where(address: params[:id]).first
      nonce = DateTime.now.strftime('%Q').to_i
      obj = Utils::Web3.new
      obj.sign_metadata_hash(params[:contract_address],current_user.address, collection.metadata_hash, nonce)
    else
      ""
    end
    render json: sign.present? ? sign.merge("nonce" => nonce) : {}
  end

  def sign_metadata_with_creator
    sign = if params[:address].present?
        account = User.where(address: params[:address]).first
        find_collection = account.collections.where(metadata_hash: params[:tokenURI]).exists?
        if(find_collection)
          obj = Utils::Web3.new
          nonce = DateTime.now.strftime('%Q').to_i
          obj.sign_metadata_hash(Settings.tradeContractAddress, account.address, params[:tokenURI],nonce)
        else 
          ""
        end
    else
      ""
    end
    render json: sign.present? ? sign.merge("nonce" => nonce) : {}
  end


  def create_product_price
    begin
      collection_name = @collection.name
      product_id = Stripe::Product.create(name: collection_name)
      quantity = params[:quantity].to_i
      unit_amount = (total_fiat_price_helper(@collection, quantity) * 100 ).to_i # in cents
      price = Stripe::Price.create(
          {
            product: product_id,
            unit_amount: unit_amount, 
            currency: 'usd',
          }
        )
      payment = FiatPayment.create(amount: unit_amount, 
                                  product_id: product_id['id'], 
                                  price_id: price['id'],
                                  user: current_user, 
                                  collection: @collection, 
                                  quantity: quantity)
      if payment.valid?
        payment.save
        render json: {status: "success", price_id: price, payment_id: payment.id}
      else
        @errors = payment.errors.full_messages
        render json: {status: "failure",}
      end
    rescue Exception => e
      Rails.logger.warn "################## Exception while creating stripe product & price ##################"
      Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
      Rails.logger.warn $!.backtrace[0..20].join("\n")
      @errors = e.message
      render json: {status: "failure",}
    end
  end

  def create_stripe_session
    begin
      base_url = Rails.application.credentials.config[:app_url]
      payment = FiatPayment.where(id: params[:payment_id])
      success_key, failure_key, uniq_token = generate_verify_fiat_token()
      payment.update(token: uniq_token)
      session = Stripe::Checkout::Session.create({
        line_items: [{
          price: params[:price_id],
          quantity: 1,
        }],
        mode: 'payment',
        success_url: "#{base_url}/collections/#{@collection.address}?token=#{success_key}",
        cancel_url: "#{base_url}/collections/#{@collection.address}?token=#{failure_key}"
      })
      payment.update(status: :pending)
      render json: {status: "success", session_url: session.url }
    rescue Exception => e
      Rails.logger.warn "################## Exception while creating stripe session ##################"
      Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
      Rails.logger.warn $!.backtrace[0..20].join("\n")
      @errors = e.message
      render json: {status: "failure",}
    end
  end

  def validate_fiat_payment
    decoded_hash = decode_hash(params[:token])
    uniq_token = decoded_hash["token"]
    status = decoded_hash["status"]
    quantity = 1
    payment = FiatPayment.where(token: uniq_token, status: :pending, user: current_user, collection: @collection).first
    if payment.present?
      quantity = payment.quantity
      status == "success" ? payment.update(status: :success) : payment.update(status: :cancelled)
    else
      status = "failure"
    end
    crypto_amt = total_payment_crypto(@collection, quantity)
    render json: {status: status, quantity: quantity, payment_amt: crypto_amt }
  end

  def total_fiat_price
    fiat_price = total_fiat_price_helper(@collection, params[:quantity].to_i)
    render json: {status: "success", data: fiat_price}
  end

  def fetch_details
    render json: {data: @collection.fetch_details(params[:bid_id], params[:erc20_address])}
  end

  def fetch_transfer_user
    user = User.validate_user(params[:address])
    if user && user.is_approved? && user.is_active?
      render json: {address: user.address}
    else
      render json: {error: 'User not found or not activated yet. Please provide address of the user registered in the application'}
    end

  end

  def sign_fixed_price
    collection = current_user.collections.unscoped.where(address: params[:id]).take
    collection.approve! if collection.pending?
    collection.update(sign_instant_sale_price: params[:sign])
  end

  def approve
    collection = current_user.collections.unscoped.where(address: params[:id]).take
    if collection.metadata_hash.present?
      collection.approve! if collection.pending?
    end
  end

  def owner_transfer
    collection = current_user.collections.unscoped.where(address: params[:id]).take
    recipient_user = User.where(address: params[:recipient_address]).first
    collection.hand_over_to_owner(recipient_user.id, params[:transaction_hash], params[:transaction_quantity].to_i)
  end

  def save_contract_nonce_value
    if params.dig("signature").present?
      contract_nonce = ContractNonceVerify.create(contract_sign_address: params.dig("signature", "sign"), contract_sign_nonce: params.dig("signature", "nonce"), user_address: current_user.address)
    end
  end

  def get_nonce_value
       render json: {nonce: DateTime.now.strftime('%Q').to_i}
  end
  
  def save_nonce_value
     if params[:sign].present?
      contract_nonce = ContractNonceVerify.create(contract_sign_address: params[:sign], contract_sign_nonce: params[:nonce], user_address: current_user.address)
     end
  end

  def get_contract_sign_nonce
    contract_nonce = ContractNonceVerify.find_by(contract_sign_address: params[:sign])
    nonce = contract_nonce.present? ? {nonce: contract_nonce.contract_sign_nonce.to_i} : {}
    render json: nonce
  end

  def update_state
    collection = Collection.find_by_address(params[:id])
    collection.state = :pending
    collection.save!
  end

  private

  def lazy_mint_token_update
    # After getting sold, the owner will mint with creators name and transfer
    lazy_minted = @collection.is_lazy_minted?
    @collection.update(token: params[:tokenId].to_i) if lazy_minted && params[:tokenId]&.to_i != 0 
    lazy_minted
    # Double validation because tokenId cant be 0
  end

  # Collection param from React  
  # def collection_params
  #   params.permit(:name, :description, :collection_address, :put_on_sale, :instant_sale_price, :unlock_on_purchase,
  #     :collection_category, :no_of_copies, :attachment)
  # end

  def collection_params
    params['collection']['category'] = params['collection']['category'].present? ? params['collection']['category'].split(",") : []
    params['collection']['nft_contract_id'] = NftContract.get_shared_id(params[:collection][:collection_type]) if params['chooseCollection'] == 'nft'
    params['collection']['nft_contract_id'] = NftContract.find_by_address(params['chooseOwnCollection'])&.id if params['chooseOwnCollection']!= 'new' && params['chooseCollection'] == 'create'
    params['collection']['erc20_token_id'] = Erc20Token.where(address: params[:collection][:currency]).first&.id if params[:collection][:currency].present?
    params.require(:collection).permit(:name, :description, :collection_address, :put_on_sale, :instant_sale_enabled, :instant_sale_price, :unlock_on_purchase,
                               :bid_id, :no_of_copies, :attachment, :cover, :data, :collection_type, :royalty, :nft_contract_id, :unlock_description,
                               :erc20_token_id, :source, :nft_link, :token, :total_copies, :contract_address, :contract_type, :imported, category: [])
  end

  def change_price_params
    params[:collection][:put_on_sale] = false if params[:collection][:put_on_sale].nil?
    params[:collection][:unlock_on_purchase] = false if params[:collection][:unlock_on_purchase].nil?
    unless params[:collection][:instant_sale_enabled]
      params[:collection][:instant_sale_enabled] = false
      params[:collection][:instant_sale_price] = nil
    end
    params.require(:collection).permit(:put_on_sale, :instant_sale_enabled, :instant_sale_price, :unlock_on_purchase, :unlock_description, :erc20_token_id)
  end

  def bid_params
    params[:user_id] = current_user.id
    params.permit(:sign, :quantity, :user_id, details: {})
  end

  def set_collection
    @collection = Collection.unscoped.where.not(state: :burned).find_by(address: params[:id])
    redirect_to root_path unless @collection.present?
  end

  def set_gon
    gon.collection_data = @collection.gon_data
  end

  def set_collection_gon
    gon.collection_data = @collection.gon_data
  end
end
























