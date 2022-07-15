class FiatPayment < ApplicationRecord
    belongs_to :user, class_name: 'User', foreign_key: 'user_id'
    belongs_to :collection, class_name: 'Collection', foreign_key: 'collection_id'
    enum status: {
      initiated: 0,
      pending: 1,
      success: 2,
      cancelled: 3, 
    }
  
  end