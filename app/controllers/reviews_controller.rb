class ReviewsController < ApplicationController
  before_action :redirect_unless_logged_in

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show
    else
      render @review.errors.full_messages, status: 422
    end
  end

  def index
    @reviews = Review.all
    render :index
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  private

  def review_params
    params.require(:review).permit(:listing_id, :rating, :review_text)
  end
end
