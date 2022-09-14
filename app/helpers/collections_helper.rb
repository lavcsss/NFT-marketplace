module CollectionsHelper
  
  GAS_PRICE_BUFFER = 0.05 # 5 percentage buffer
  
  def cover_url(collection)
    return '/assets/dummy-image.jpg' if unauthorized_to_show_attachment(collection)
    attachment = ['image/png', 'image/jpeg', 'image/gif'].include?(collection.attachment.content_type) ? collection.attachment_with_variant(:thumb) : collection.cover
    attachment.present? ? url_for(attachment) : '/assets/banner-1.png'
    # pinata_url(collection)
  end

  def attachment_tag(collection)
    attachment = collection.attachment
    return image_tag '/assets/dummy-image.jpg', class: "img-responsive" if unauthorized_to_show_attachment(collection)

    if ['audio/mp3', 'audio/webm', 'audio/mpeg'].include?(attachment.content_type)
      audio_tag url_for(attachment), size: "550x400", controls: true, controlslist: "nodownload noplaybackrate"
    elsif ['video/mp4', 'video/webm'].include?(attachment.content_type)
      video_tag url_for(attachment), class: "video-responsive", controls: true, disablepictureinpicture: true, controlslist: "nodownload noremoteplayback noplaybackrate"
    else
      # image_tag pinata_url(collection), class: "img-responsive"
      image_tag url_for(attachment), class: "img-responsive modal-img"
    end
  end

  def cover_tag(collection)
    attachment = collection.attachment
    if ['audio/mp3', 'audio/webm', 'audio/mpeg'].include?(attachment.content_type)
      image_tag cover_url(collection), class: "img-responsive"
    end
  end

  def unauthorized_to_show_attachment(collection)
    # collection.unlock_on_purchase? && (!current_user.present? || (current_user && current_user != collection.owner))
    return false
  end

  def pinata_url(collection)
    collection.image_hash.present? ? "https://gateway.pinata.cloud/ipfs/#{collection.image_hash}" : '/assets/dummy-image.jpg'
  end

  def contract_path(collection)
    return 'javascript:void(0)'if collection.nft_contract.shared? 
    nft_contract_path(:id => collection.nft_contract.address)
  end

  def gas_price_eth(collection)
    if collection.is_lazy_minted?
      gas_limit = 616883
    else
      gas_limit = 516883
    end
    gas_price_gwei = Api::Etherscan.gas_price
    if gas_price_gwei.nil? || gas_price_gwei == 0
      gas_price_gwei = Api::Gasprice.gas_price["fastest"] / 10
      if gas_price_gwei == '' || gas_price_gwei.nil?
        gas_price_gwei = 40
      end
    end
    gas_consumed_in_gwei = gas_price_gwei * gas_limit
    gas_consumed_in_ether = gas_consumed_in_gwei.to_f * 0.000000001 # 1 gwei  - 0.000000001 ETH
  end

  def gas_price_usd(collection)
    gas_consumed_in_ether = gas_price_eth(collection)
    gas_consumed_in_usd = collection.sale_price_to_fiat(gas_consumed_in_ether, 'ETH')
    return (gas_consumed_in_usd * GAS_PRICE_BUFFER) + gas_consumed_in_usd
  end

  def service_fee(collection, quantity=1)
    collection_price = collection.instant_sale_price.to_f * quantity
    service_fee = (collection_price / 100) * Fee.buyer_service_fee.to_f
    collection.sale_price_to_fiat(service_fee, collection.collection_coin)
  end

  def total_fiat_price_helper(collection, quantity=1)
    collection_price = collection.instant_sale_price.to_f * quantity
    collection_price_usd = collection.sale_price_to_fiat(collection_price, collection.collection_coin)
    total_price_usd = (collection_price_usd + service_fee(collection, quantity) + gas_price_usd(collection)).round(2)
    if total_price_usd < 0.5
      total_price_usd = 0.6
    end
    return total_price_usd
  end

  def total_payment_crypto(collection, quantity=1)
    collection_price = collection.instant_sale_price.to_f * quantity
    service_fee = (collection_price / 100) * Fee.buyer_service_fee.to_f
    return collection_price + service_fee
  end

  def encode_hash(uniq_token, status)
    hash_enc = JSON.dump({token: uniq_token, status: status})
    return Base64.encode64(hash_enc)
  end

  def decode_hash(encoded_hash)
    hash_dec = Base64.decode64(encoded_hash)
    return JSON.load(hash_dec)
  end

  def generate_verify_fiat_token
    rand_token = ""
    loop do
      rand_token = SecureRandom.hex(30)
      payment = FiatPayment.where(token: rand_token)
      break if payment.blank?
    end
    success_key = encode_hash(rand_token, "success")
    failure_key = encode_hash(rand_token, "cancelled")
    return success_key, failure_key, rand_token
  end

  def no_kyc_detail
    kyc_detail = KycDetail.where(user: current_user)
    return kyc_detail.blank?
  end

  def check_balance_erc20(erc20_address)
    obj = Utils::Web3.new
    obj.check_balance_erc20(erc20_address, Settings.tradeProxyContractAddress)
  end

  def check_balance_eth(address)
    obj = Utils::Web3.new
    obj.check_balance_eth(address)
  end

  def show_fiat_buy_option(collection)
    gas_price = Rails.cache.fetch "gas_price", expires_in: 10.minute do
      gas_price_eth(collection)
    end
    primary_acc_balance = Rails.cache.fetch "primary_acc_balance", expires_in: 10.minute do
      check_balance_eth(Rails.application.credentials[:primary_account][:address]).to_d
    end
    contract_eth_balance = Rails.cache.fetch "contract_eth_balance", expires_in: 10.minute do
      check_balance_eth(Settings.tradeProxyContractAddress).to_d
    end
    contract_weth_balance = Rails.cache.fetch "contract_weth_balance", expires_in: 10.minute do
      check_balance_erc20(Settings.wethAddress).to_d
    end
    if collection.is_eth_payment
      return  contract_eth_balance >= collection.instant_sale_price && primary_acc_balance >= gas_price
    else
      return contract_weth_balance >= collection.instant_sale_price && primary_acc_balance >= gas_price
    end
  end

  
end
