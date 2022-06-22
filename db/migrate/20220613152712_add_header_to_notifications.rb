class AddHeaderToNotifications < ActiveRecord::Migration[6.1]
  def change
    add_column :notifications, :header, :string
  end
end
