class HomeController < ApplicationController
  def index
    @featured_kois = Koi.available.includes(:images).limit(6)
  end
end
