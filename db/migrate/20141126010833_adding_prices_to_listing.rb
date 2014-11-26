class AddingPricesToListing < ActiveRecord::Migration
  def change
    add_column :listings, :price, :integer
    change_column :listings, :price, :integer, null: false
  end
end
