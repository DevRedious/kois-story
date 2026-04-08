class Message < ApplicationRecord
  validates :sender_name, :sender_email, :body, presence: true
  validates :sender_email, format: { with: URI::MailTo::EMAIL_REGEXP }

  after_create :notify_contacts

  scope :unread, -> { where(read: false) }
  scope :processed, -> { where.not(processed_at: nil) }

  def mark_as_read!
    update!(read: true)
  end

  def mark_as_processed!
    update!(read: true, processed_at: Time.current)
  end

  def mark_as_unread!
    update!(read: false, processed_at: nil)
  end

  def contact_reference
    "KS-#{id.to_s.rjust(4, '0')}"
  end

  def reply_subject
    "[Koi's Story] Re: #{sender_name} - #{contact_reference}"
  end

  def status
    return :processed if processed_at.present?
    return :read if read?

    :unread
  end

  private

  def notify_contacts
    MessageMailer.new_message(self).deliver_now if ENV["ADMIN_EMAIL"].present?
    MessageMailer.acknowledgement(self).deliver_now
  end
end
