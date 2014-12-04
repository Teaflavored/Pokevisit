class EditListingsToAddAverageRating < ActiveRecord::Migration
  def change
    add_column :listings, :avg_rating, :float, default: nil
  end
end
