json.array!(@user_images) do |user_image|
  json.partial!("user_images/user_image", user_image: user_image)
end
