class ImageUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  def public_id
    "kois-story/#{model.class.name.downcase}/#{model.id}"
  end
end
