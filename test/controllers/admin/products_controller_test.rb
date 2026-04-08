require "test_helper"

class Admin::ProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in users(:one)
  end

  test "should get index" do
    get admin_products_url
    assert_response :success
  end

  test "should filter products by category" do
    Product.create!(name: "Pompe", reference: "MAT-1", category: :materiel, status: :active, price: 10)
    Product.create!(name: "Soin", reference: "SOI-1", category: :soins, status: :active, price: 12)

    get admin_products_url, params: { category: :materiel }

    assert_response :success
    assert_select "tbody tr", text: /Pompe/
    assert_select "tbody tr", text: /Soin/, count: 0
  end

  test "should sort products by price descending" do
    Product.create!(name: "Petit filtre", reference: "FIL-1", category: :materiel, status: :active, price: 5)
    Product.create!(name: "Grand filtre", reference: "FIL-2", category: :materiel, status: :active, price: 25)

    get admin_products_url, params: { sort: :price, direction: :desc }

    assert_response :success
    assert_select "tbody tr:first-child td", text: /Grand filtre/
  end

  test "should get show" do
    get admin_product_url(products(:one))
    assert_response :success
  end

  test "should create product" do
    assert_difference("Product.count", 1) do
      post admin_products_url, params: {
        product: {
          name: "Pompe premium",
          reference: "PMP-900",
          category: "materiel",
          status: "active",
          price: 299.99,
          stock_quantity: 5
        }
      }
    end

    assert_redirected_to admin_products_url
  end
end
