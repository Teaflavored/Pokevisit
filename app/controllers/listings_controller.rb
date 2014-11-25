class ListingsController < ApplicationController
  before_action :redirect_unless_logged_in

  def index
    @listings = Listing.all_except_current_user(current_user)
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render :show
  end
end
