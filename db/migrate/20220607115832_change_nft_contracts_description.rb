class ChangeNftContractsDescription < ActiveRecord::Migration[6.1]
  def up
    change_column :nft_contracts, :description, :text
  end

  def down
    change_column :nft_contracts, :description, :string
  end
end
