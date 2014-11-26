class AddDatesToListings < ActiveRecord::Migration
  def change
    add_column :listings, :date_avail, :datetime
    add_column :listings, :date_end, :datetime
  end
end
