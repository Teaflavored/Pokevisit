# == Schema Information
#
# Table name: user_images
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  url        :string(255)      default("/assets/default_user_pic.jpg"), not null
#  created_at :datetime
#  updated_at :datetime
#

class UserImage < ActiveRecord::Base
  validates :user, :url, presence: true
  
  belongs_to :user
end
