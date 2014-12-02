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

  def create
    @listing = current_user.listings.new(listing_params)
    if @listing.save
      render :show
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update(listing_params)
      render :show
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def own_listings
    #get list of user's own listings then ride off of index json
    #use for approve and deny
    @listings = current_user.listings.includes(:reservations)
    render :own_listings
  end

  private

  def listing_params
    params.require(:listing).permit(:hometype, :checkintime, :checkouttime, :description_summary, :roomtype, :accomodates, :description,:date_avail, :date_end, :address, :price)
  end
end
