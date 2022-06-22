class AddColumnsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :youtube_link, :string
    add_column :users, :facebook_link, :string
  end
end
