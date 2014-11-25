json.array!(@listings) do |listing|
  json.partial!("listings/listing", listing: listing)
  json.images do
    json.array!(listing.listing_images) do |image|
      json.extract!(image, :id, :url, :listing_id)
    end
  end
end
