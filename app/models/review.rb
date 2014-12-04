# == Schema Information
#
# Table name: reviews
#
#  id          :integer          not null, primary key
#  listing_id  :integer          not null
#  user_id     :integer          not null
#  rating      :integer          not null
#  review_text :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Review < ActiveRecord::Base
  validates :listing_id, :user_id, :rating, :review_text, presence: true
  belongs_to :listing
  belongs_to :user
end
