class Image < ApplicationRecord
  mount_uploader :url, ImageUploader

  belongs_to :imageable, polymorphic: true
  validates :url, presence: true
  validate :uploaded_file_must_be_supported

  private

  def uploaded_file_must_be_supported
    return unless url.present? && url.file.respond_to?(:content_type)

    content_type = url.file.content_type.to_s
    return if ImageUploader::ALLOWED_CONTENT_TYPES.any? { |pattern| pattern.match?(content_type) }

    errors.add(:url, "must be a supported image format")
  end
end
