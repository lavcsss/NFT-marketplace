class NftContract < ApplicationRecord

  include Rails.application.routes.url_helpers
  has_many :collections
  has_many :transactions
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id', optional: true
  has_one_attached :attachment, dependent: :destroy
  has_one_attached :cover, dependent: :destroy

  enum contract_type: [:nft721, :nft1155]

  def self.get_shared_id type
    type == 'single' ? where(symbol: 'Shared', contract_type: :nft721).first&.id : where(symbol: 'Shared', contract_type: :nft1155).first&.id
  end

  def shared?
    symbol == 'Shared'
  end

  def masked_address(first_char=13, last_char=4)
    "#{address[0..first_char]}...#{address.split(//).last(last_char).join("").to_s}"
  end

  def contract_asset_type
    nft1155? ? 0 : 1
  end

  def attachment_url
    Rails.application.routes.default_url_options[:host] = Rails.application.credentials.config[:app_url] || 'localhost:3000'
    self.attachment.present? ? url_for(attachment) : '/assets/banner-1.png'
  end

  def cover_url
    Rails.application.routes.default_url_options[:host] = Rails.application.credentials.config[:app_url] || 'localhost:3000'
    self.cover.present? ? url_for(cover) : '/assets/banner-1.png'
  end
  
end
