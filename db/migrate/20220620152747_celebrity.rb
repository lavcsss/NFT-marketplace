class Celebrity < ActiveRecord::Migration[6.1]
  def change
    create_table :celebrities do |t|
      t.string :asset
      t.string :title
      t.string :description
      t.string :redirect_link
      t.timestamps
    end
  end
end
