class EditUsersToAddImages < ActiveRecord::Migration
  def change
    add_column :users, :image_url, :string, default: "/assets/default_user_pic.jpg"
  end
end
