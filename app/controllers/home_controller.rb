class HomeController < ApplicationController
  def index
    @featured_kois = Koi.available.with_images.includes(:images).limit(6)
  end
end
