class KoisController < ApplicationController
  def index
    @kois = Koi.filter(params).includes(:images).order(created_at: :desc)
    @varieties = Koi.distinct.pluck(:variety).sort
  end

  def show
    @koi = Koi.find(params[:id])
    @images = @koi.images
  end
end
