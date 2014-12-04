# == Schema Information
#
# Table name: listings
#
#  id                  :integer          not null, primary key
#  user_id             :integer          not null
#  hometype            :string(255)      not null
#  roomtype            :string(255)      not null
#  accomodates         :integer          not null
#  created_at          :datetime
#  updated_at          :datetime
#  lat                 :float            not null
#  lng                 :float            not null
#  price               :integer          not null
#  date_avail          :datetime
#  date_end            :datetime
#  address             :string(255)
#  description         :text             default("What a great place to live!")
#  checkintime         :string(255)
#  checkouttime        :string(255)
#  description_summary :text
#  avg_rating          :float
#

class Listing < ActiveRecord::Base
  validates :user, :hometype, :roomtype, :accomodates, presence: true
  #geocode address
  geocoded_by :address, latitude: :lat, longitude: :lng
  after_validation :geocode
  after_initialize :get_check_in_check_out_times

  belongs_to :user
  has_many :listing_images
  has_many :reservations

  def self.all_except_current_user(user)
    Listing.where("user_id != ?", user.id)
  end

  private

  def get_check_in_check_out_times
    self.checkintime ||= "12:00pm"
    self.checkouttime ||= "6:00pm"
  end
end
