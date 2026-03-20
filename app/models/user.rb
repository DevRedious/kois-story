class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :two_factor_authenticatable,
         otp_secret_encryption_key: ENV["OTP_SECRET_KEY"]

  enum :role, { visitor: 0, admin: 1 }
end
