class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(params[:user][:email],
                                    params[:user][:password])
    if user.nil?
      render json: ["Invalid E-mail or Password."].to_json, status: 422
    else
      sign_in user
      render json: user
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to root_url
  end
end
