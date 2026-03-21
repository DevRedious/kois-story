class ImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  ALLOWED_EXTENSIONS = %w[jpg jpeg png webp gif avif].freeze
  ALLOWED_CONTENT_TYPES = [%r{\Aimage/jpeg\z}, %r{\Aimage/png\z}, %r{\Aimage/webp\z}, %r{\Aimage/gif\z}, %r{\Aimage/avif\z}].freeze

  def public_id
    "kois-story/#{model.class.name.downcase}/#{model.id}"
  end

  def extension_allowlist
    ALLOWED_EXTENSIONS
  end

  def content_type_allowlist
    ALLOWED_CONTENT_TYPES
  end

  def size_range
    1.byte..10.megabytes
  end
end
