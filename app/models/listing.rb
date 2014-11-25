# == Schema Information
#
# Table name: listings
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  hometype    :string(255)      not null
#  roomtype    :string(255)      not null
#  accomodates :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Listing < ActiveRecord::Base
  validates :user, :hometype, :roomtype, :accomodates, presence: true

  belongs_to :user
  has_many :listing_images

  def self.all_except_current_user(user)
    Listing.where("user_id != ?", user.id)
  end
end
