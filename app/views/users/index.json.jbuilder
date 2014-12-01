json.array!(@users) do |user|
  json.extract!(user, :id, :email, :image_url)
end
