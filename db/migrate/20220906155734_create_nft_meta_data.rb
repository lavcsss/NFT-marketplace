class CreateNftMetaData < ActiveRecord::Migration[6.1]
  def change
    create_table :nft_metadata do |t|
      t.references :user, foreign_key: { to_table: :users }
      t.string :contract_address
      t.string :token_id
      t.string :name
      t.text :description
      t.text :image_url
      t.timestamps
    end
  end
end
