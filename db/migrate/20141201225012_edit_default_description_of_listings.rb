class EditDefaultDescriptionOfListings < ActiveRecord::Migration
  def change
    change_column :listings, :description, :text, default: "What a great place to live!"
  end
end
