json.array!(@listings) do |listing|
  json.partial!("listings/listing", listing: listing)
  json.images do
    json.array!(listing.listing_images) do |image|
      json.extract!(image, :id, :url, :listing_id)
    end
  end
  json.reservations do
    json.array!(listing.reservations) do |reservation|
      json.extract!(reservation, :id, :user_id, :listing_id, :status, :start_date, :end_date)
    end
  end
end
