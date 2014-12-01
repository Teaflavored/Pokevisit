class Addcheckincheckouttimes < ActiveRecord::Migration
  def change
    add_column :listings, :checkintime, :string
    add_column :listings, :checkouttime, :string
  end
end
