class CreateFiatPayments < ActiveRecord::Migration[6.1]
  def change
    create_table :fiat_payments do |t|
      t.references :user, foreign_key: { to_table: :users }
      t.references :collection, foreign_key: { to_table: :collections }
      t.integer :amount
      t.string :price_id
      t.string :product_id
      t.integer :quantity
      t.string :token
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
