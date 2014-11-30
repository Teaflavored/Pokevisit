class ReservationsController < ApplicationController
  before_action :redirect_unless_logged_in

  def index
    #all reservations made by current_user, used to see if any approved or denied
    @reservations = current_user.reservations
    render :index
  end

  def approve
    @reservation = Reservation.find(params[:reservation_id])
    if @reservation.approve!
      render json: ["Successful approval!"]
    else
      render json: ["Something went wrong"], status: 422
    end
  end

  def deny
    @reservation = Reservation.find(params[:reservation_id])
    @reservation.deny!
    render json: ["Successful deny!"]
  end

  def create
    @reservation = current_user.reservations.new(reservation_params)
    if @reservation.save
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.destroy
    render json: @reservation
  end

  private

  def reservation_params
    params.require(:reservation).permit(:start_date, :end_date, :guests, :listing_id)
  end
end
