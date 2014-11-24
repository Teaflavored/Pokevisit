class StaticPagesController < ApplicationController
  def landing_page
    render :landing_page
  end

  def main
    render :main
  end
end
