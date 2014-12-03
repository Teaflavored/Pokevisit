# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#  image_url       :string(255)      default("/assets/default_user_pic.jpg")
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true}

  after_initialize :ensure_session_token
  # after_validation :create_user_image
  before_save :email_down_case

  #associations
  has_many :listings
  # has_one :user_image
  has_many :reservations

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email.downcase)
    return nil unless user && user.is_password?(password)

    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def create_user_image
    if(!self.user_image)
      UserImage.create(user: self)
    end
  end

  def email_down_case
    self.email = self.email.downcase
  end
end
