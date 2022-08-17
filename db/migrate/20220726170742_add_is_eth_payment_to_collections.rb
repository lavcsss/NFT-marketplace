class AddIsEthPaymentToCollections < ActiveRecord::Migration[6.1]
  def change
    add_column :collections, :is_eth_payment, :boolean, :default => false
  end
end
