class KycDetail < ApplicationRecord
    belongs_to :user, class_name: 'User', foreign_key: 'user_id'  

    validates :name, :email_id, :country, :mobile_no, :address, presence: true
    validates :name, length: {maximum: 100}
    validates :email_id, length: {maximum: 50}
    validates :address, length: {minimum: 10, maximum: 250}
end