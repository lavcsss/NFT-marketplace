class CreateKycDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :kyc_details do |t|
      t.references :user, foreign_key: { to_table: :users }
      t.string :name
      t.string :email_id
      t.string :country
      t.string :mobile_no
      t.text :address
      t.timestamps
    end
  end
end
