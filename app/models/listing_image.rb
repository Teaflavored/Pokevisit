# == Schema Information
#
# Table name: listing_images
#
#  id         :integer          not null, primary key
#  url        :string(255)      not null
#  listing_id :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class ListingImage < ActiveRecord::Base
  validates :url, :listing, presence: true

  belongs_to :listing
end
