class CreateListingImages < ActiveRecord::Migration
  def change
    create_table :listing_images do |t|
      t.string :url, null: false
      t.integer :listing_id, null: false
      t.timestamps
    end

    add_index :listing_images, :listing_id
  end
end
