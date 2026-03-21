require "test_helper"
require "rack/test"

class KoiTest < ActiveSupport::TestCase
  test "is valid with required attributes" do
    koi = Koi.new(
      name: "Test Koi",
      variety: "Kohaku",
      price: 1000,
      status: :available,
      user: users(:one)
    )
    assert koi.valid?
  end

  test "is invalid without a name" do
    koi = Koi.new(variety: "Kohaku", price: 1000, status: :available, user: users(:one))

    assert_not koi.valid?
    assert_includes koi.errors[:name], "can't be blank"
  end

  test "with_images only returns kois with linked images" do
    image_less_koi = Koi.create!(
      name: "Sans image",
      variety: "Showa",
      price: 500,
      status: :available,
      user: users(:one)
    )

    assert_includes Koi.with_images, kois(:one)
    assert_not_includes Koi.with_images, image_less_koi
  end

  test "filter with available param only returns available kois with images" do
    available_koi = Koi.create!(
      name: "Disponible",
      variety: "Kohaku",
      price: 1200,
      status: :available,
      user: users(:one)
    )
    attach_test_image(available_koi)

    filtered = Koi.filter(available: "1")

    assert_includes filtered, available_koi
    assert_not_includes filtered, kois(:one)
  end

  test "filter does not allow sql injection through max_price" do
    pricey_koi = Koi.create!(
      name: "Cher",
      variety: "Sanke",
      price: 5000,
      status: :available,
      user: users(:one)
    )
    attach_test_image(pricey_koi)

    filtered = Koi.filter(max_price: "0 OR 1=1")

    assert_empty filtered
  end

  test "filter does not allow sql injection through max_size" do
    large_koi = Koi.create!(
      name: "Grand",
      variety: "Showa",
      size_cm: 80,
      price: 1800,
      status: :available,
      user: users(:one)
    )
    attach_test_image(large_koi)

    filtered = Koi.filter(max_size: "0 OR 1=1")

    assert_empty filtered
  end

  private

  def attach_test_image(koi)
    image = koi.images.build(position: 1, alt: "Test image")
    image.save!(validate: false)
    image.update_column(:url, "test-image.png")
  end
end
