# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

  validates :username, presence: true, uniqueness: true, length: { in: 3..30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email"}
  validates :email, presence: true, uniqueness: true, length: { in: 3..255 }, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: {in: 6..255}, allow_nil: true

  has_many :products, dependent: :destroy

  has_many :cart_items, dependent: :destroy

  has_secure_password # this handles password getter, setter, and is_password? for us

  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    if credential.match?(URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    puts "Found User: #{user.inspect}"
    puts "User authentication: #{user&.authenticate(password)}"

    if user && user.authenticate(password)
      return user
    else
      return nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end


  private

  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
