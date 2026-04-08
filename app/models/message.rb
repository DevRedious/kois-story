class Message < ApplicationRecord
  validates :sender_name, :sender_email, :body, presence: true
  validates :sender_email, format: { with: URI::MailTo::EMAIL_REGEXP }

  after_create :notify_contacts

  scope :unread, -> { where(read: false) }

  def mark_as_read!
    update!(read: true)
  end

  private

  def notify_contacts
    MessageMailer.new_message(self).deliver_now if ENV["ADMIN_EMAIL"].present?
    MessageMailer.acknowledgement(self).deliver_now
  end
end
