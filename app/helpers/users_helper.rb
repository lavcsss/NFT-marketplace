module UsersHelper
  def link_to_image(user)
    return if user.blank?
      image_tag url_for(user.profile_image)
  end

  def link_to_name(user)
    return if user.blank?
      link_to user.full_name, user_path(user.address)
  end

  def link_to_twitter(user)
    return if user&.twitter_link.blank?
      link_to "https://twitter.com/#{user.twitter_link}" do
        "@ #{user.twitter_link}"
      end
  end

  def link_to_bio(user)
    return if user&.bio.blank?
    content_tag(:p, class: "author__text") do 
      user.bio
    end
  end

  def link_to_personal_url(user)
    return if user&.personal_url.blank?
    link_to format_link(user.personal_url), class: "author__link" do
      "#{content_tag(:svg, "xmlns"=>"http://www.w3.org/2000/svg", "viewBox"=>"0 0 24 24") {
        content_tag(:path, nil, "d"=>"M21.41,8.64s0,0,0-.05a10,10,0,0,0-18.78,0s0,0,0,.05a9.86,9.86,0,0,0,0,6.72s0,0,0,.05a10,10,0,0,0,18.78,0s0,0,0-.05a9.86,9.86,0,0,0,0-6.72ZM4.26,14a7.82,7.82,0,0,1,0-4H6.12a16.73,16.73,0,0,0,0,4Zm.82,2h1.4a12.15,12.15,0,0,0,1,2.57A8,8,0,0,1,5.08,16Zm1.4-8H5.08A8,8,0,0,1,7.45,5.43,12.15,12.15,0,0,0,6.48,8ZM11,19.7A6.34,6.34,0,0,1,8.57,16H11ZM11,14H8.14a14.36,14.36,0,0,1,0-4H11Zm0-6H8.57A6.34,6.34,0,0,1,11,4.3Zm7.92,0h-1.4a12.15,12.15,0,0,0-1-2.57A8,8,0,0,1,18.92,8ZM13,4.3A6.34,6.34,0,0,1,15.43,8H13Zm0,15.4V16h2.43A6.34,6.34,0,0,1,13,19.7ZM15.86,14H13V10h2.86a14.36,14.36,0,0,1,0,4Zm.69,4.57a12.15,12.15,0,0,0,1-2.57h1.4A8,8,0,0,1,16.55,18.57ZM19.74,14H17.88A16.16,16.16,0,0,0,18,12a16.28,16.28,0,0,0-.12-2h1.86a7.82,7.82,0,0,1,0,4Z") }}#{user.personal_url}".html_safe
    end
  end

  def twitter_url(user)
    return if user&.twitter_link.blank?
      "https://twitter.com/#{user.twitter_link}"
  end

  def format_link(url)
    return url if url.match(/\Ahttp[s]{0,1}\:/)
    'https://' + url
  end

  def masked_address(address, first_char=6, last_char=3)
    "#{address[0..first_char]}...#{address.split(//).last(last_char).join("").to_s}"
  end

  def notification_image_url(image_url)
    if image_url.match(/\Ahttp[s]{0,1}\:/)
      index_pt = image_url.index('/rails')  
      Rails.application.credentials.config[:app_url] + image_url[index_pt..-1]
    else
      image_url
    end   
  end

  def save_nftmetadata(asset_response, user, contract_address, token_id)
    nft_metadata = NftMetadata.new(
      user: user, 
      contract_address: contract_address,
      token_id: token_id,
      name: asset_response[:name],
      description: asset_response[:description],
      image_url: asset_response[:image]
    )
    if nft_metadata.valid?
      nft_metadata.save
    end
  end

  def fetch_nftmetadata(user, contract_address, token_id)
    meta_info = NftMetadata.where(user: user, contract_address: contract_address, token_id: token_id).first
    if meta_info
      data = Hash.new
      data[:name] = meta_info.name
      data[:description] = meta_info.description
      data[:image] = meta_info.image_url
      return data
    end
  end

  def valid_url(url)
    uri = URI.parse(url)
    uri.kind_of?(URI::HTTP) or uri.kind_of?(URI::HTTPS)
  end
end
