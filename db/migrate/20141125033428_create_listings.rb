class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :user_id, null: false
      t.string :hometype, null: false
      t.string :roomtype, null: false
      t.integer :accomodates, null: false
      t.timestamps
    end

    #adding indexes b/c may need to filter by these
    add_index :listings, :user_id
    add_index :listings, :hometype
    add_index :listings, :roomtype
    add_index :listings, :accomodates
  end
end
