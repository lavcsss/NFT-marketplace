class NftMetadata < ApplicationRecord
    belongs_to :user, class_name: 'User', foreign_key: 'user_id'  
    validates :contract_address, :token_id, presence: true
end