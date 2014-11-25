json.array!(@listings) do |listing|
  json.partial!("/listings/listing", listing: listing)
end
