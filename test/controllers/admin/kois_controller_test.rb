require "test_helper"
require "rack/test"
require "tempfile"

class Admin::KoisControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_kois_url
    assert_response :success
  end

  test "should get show" do
    get admin_koi_url(kois(:one))
    assert_response :success
  end

  test "should get new" do
    get new_admin_koi_url
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_koi_url(kois(:one))
    assert_response :success
  end

  test "should create koi" do
    assert_difference("Koi.count", 1) do
      post admin_kois_url, params: {
        koi: {
          name: "Nouvelle koi",
          variety: "Kohaku",
          age_class: "nisai",
          age: 2,
          sex: "female",
          size_cm: 45,
          price: 1500,
          status: "available",
          konishi_lineage: "1",
          description: "Belle koi"
        }
      }
    end

    assert_redirected_to admin_kois_url
  end

  test "should update koi" do
    patch admin_koi_url(kois(:one)), params: {
      koi: { name: "Nom modifie", variety: kois(:one).variety, price: kois(:one).price, status: kois(:one).status }
    }

    assert_redirected_to admin_kois_url
    assert_equal "Nom modifie", kois(:one).reload.name
  end

  test "should destroy koi" do
    koi = Koi.create!(
      name: "A supprimer",
      variety: "Kohaku",
      price: 900,
      status: :available,
      user: users(:one)
    )

    assert_difference("Koi.count", -1) do
      delete admin_koi_url(koi)
    end

    assert_redirected_to admin_kois_url
  end

  test "should not destroy koi linked to an order" do
    assert_no_difference("Koi.count") do
      delete admin_koi_url(kois(:one))
    end

    assert_redirected_to admin_kois_url
  end

  test "should reject invalid uploaded image" do
    Tempfile.create([ "upload", ".txt" ]) do |file|
      file.write("not an image")
      file.rewind

      assert_no_difference("Koi.count") do
        post admin_kois_url, params: {
          koi: {
            name: "Koi invalide",
            variety: "Kohaku",
            price: 1500,
            status: "available",
            uploaded_images: [ Rack::Test::UploadedFile.new(file.path, "text/plain") ]
          }
        }
      end

      assert_response :unprocessable_entity
    end
  end
end
