class KoisController < ApplicationController
  def index
    @kois = Koi.filter(params).includes(:images).order(created_at: :desc)
    @varieties = Koi.with_images.distinct.pluck(:variety).sort
  end

  def show
    @koi = Koi.with_images.find(params[:id])
    @images = @koi.images
    @related_kois = Koi.available.with_images.where.not(id: @koi.id).includes(:images).limit(3)
  end
end
