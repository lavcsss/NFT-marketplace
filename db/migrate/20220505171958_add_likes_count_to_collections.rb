class AddLikesCountToCollections < ActiveRecord::Migration[6.1]
  def change
    add_column :collections, :likes_count, :integer, default: 0, null: false
  end
end
