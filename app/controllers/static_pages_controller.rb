class StaticPagesController < ApplicationController
  before_action :redirect_to_main_if_logged_in, only: [:landing_page]
  before_action :redirect_unless_logged_in, only: [:main]

  def landing_page
    render :landing_page
  end

  def main
    render :main
  end
end
