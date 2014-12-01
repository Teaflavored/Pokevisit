class EditListingsToAddDesc < ActiveRecord::Migration
  def change
    add_column :listings, :description, :text
  end
end
