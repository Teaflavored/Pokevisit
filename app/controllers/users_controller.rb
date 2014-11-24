class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in @user
      render json: @user
    else
      render @users.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
