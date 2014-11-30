class ListingImagesController < ApplicationController
  before_action :redirect_unless_logged_in

  def create
    @listing_image = ListingImage.new(listing_images_params)
    if @listing_image.save
      render json: @listing_image
    else
      render json: @listing_image.errors.full_messages, status: 422
    end
  end

  private

  def listing_images_params
    params.require(:image).permit(:url, :listing_id)
  end
end
