class CreateUserImages < ActiveRecord::Migration
  def change
    create_table :user_images do |t|
      t.integer :user_id, null: false
      t.string :url, null: false, default: "/assets/default_user_pic.jpg"
      t.timestamps
    end
  end
end
