require "test_helper"
require "rack/test"
require "tempfile"

class ImageTest < ActiveSupport::TestCase
  test "accepts a supported image upload" do
    image = Image.new(imageable: kois(:one))
    image.url = Rack::Test::UploadedFile.new(valid_image_path, "image/png")

    assert image.valid?
  end

  test "rejects a non image upload" do
    image = Image.new(imageable: kois(:one))

    Tempfile.create([ "upload", ".txt" ]) do |file|
      file.write("not an image")
      file.rewind
      image.url = Rack::Test::UploadedFile.new(file.path, "text/plain")

      assert_not image.valid?
      assert_includes image.errors[:url], "must be a supported image format"
    end
  end

  private

  def valid_image_path
    Rails.root.join("public/docs/assets/LOGO MANU FINI.png")
  end
end
