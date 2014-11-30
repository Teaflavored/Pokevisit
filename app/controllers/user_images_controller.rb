class UserImagesController < ApplicationController

  def update
    @user_image = UserImage.find(params[:id])
    if @user_image.update(user_image_params)
      render :show
    else
      render json: @user_image.errors.full_messages, status: 422
    end
  end

  def index
    @user_images = UserImage.all
    render :index
  end

  private

  def user_image_params
    params.require(:user_image).permit(:url)
  end
end
