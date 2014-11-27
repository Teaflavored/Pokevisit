json.partial!("listings/listing", listing: @listing)
json.images do
  json.array!(@listing.listing_images) do |image|
    json.extract!(image, :id, :url, :listing_id)
  end
end
json.reservations do
  json.array!(@listing.reservations) do |reservation|
    json.partial!("reservations/reservation", reservation: reservation)
  end
end
