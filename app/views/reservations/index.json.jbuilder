json.array!(@reservations) do |reservation|
  json.partial!("reservations/reservation", reservation: reservation)
end
