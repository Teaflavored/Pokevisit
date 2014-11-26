class EditListings < ActiveRecord::Migration
  def change
    add_column :listings, :lat, :float
    change_column :listings, :lat, :float, null: false

    add_column :listings, :lng, :float
    change_column :listings, :lng, :float, null: false
  end
end
