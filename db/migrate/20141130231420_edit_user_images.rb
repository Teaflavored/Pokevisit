class EditUserImages < ActiveRecord::Migration
  def change
    add_index :user_images, :user_id, unique: true
  end
end
