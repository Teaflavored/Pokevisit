class ListingsController < ApplicationController
  before_action :redirect_unless_logged_in

  def index
    @listings = Listing.includes(:listing_images).all_except_current_user(current_user)
    render :index
  end

  def show
    @listing = Listing.includes(:listing_images, :reservations).find(params[:id])
    render :show
  end

  def own_listings
    #get list of user's own listings then ride off of index json
    @listings = current_user.listings
    render :index
  end
end
