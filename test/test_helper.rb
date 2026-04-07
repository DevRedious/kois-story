ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"
require "devise"

CarrierWave.configure do |config|
  config.storage = :file
  config.enable_processing = false
end

ImageUploader.class_eval do
  def remove!
    # no-op in test — prevents Cloudinary API calls on destroy
  end
end

module ActiveSupport
  class TestCase
    # Windows Ruby does not implement fork, which Rails parallel tests use.
    parallelize(workers: :number_of_processors) unless Gem.win_platform?

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end

class ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
end
