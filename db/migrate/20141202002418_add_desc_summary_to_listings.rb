class AddDescSummaryToListings < ActiveRecord::Migration
  def change
    add_column :listings, :description_summary, :text
  end
end
