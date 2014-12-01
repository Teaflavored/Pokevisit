# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.transaction do
  User.create!(email: "random@random.org", password: "password")
  User.create!(email: "random2@random.org", password: "password")
  User.create!(email: "random3@random.org", password: "password")
  User.create!(email: "random4@random.org", password: "password")
  User.create!(email: "random5@random.org", password: "password")
  User.create!(email: "random6@random.org", password: "password")
  User.create!(email: "random7@random.org", password: "password")
end

def create_listings_for(user, room_types, accomodates, prices, home_types)
  user.listings.create!(
    roomtype: room_types.sample,
    accomodates: accomodates.sample,
    lat: Faker::Address.latitude,
    lng: Faker::Address.longitude,
    price: prices.sample,
    hometype: home_types.sample,
    date_avail: Faker::Date.between(Date.new(2015,1,1), Date.new(2015,5,1)),
    date_end: Faker::Date.between(Date.new(2015,6,1), Date.new(2015,8,1))
  )
end

def create_listing_images_for(user, images)
  image_url = "/assets/" + images.sample
  user.listings.sample.listing_images.create!(
    url: image_url
  )
end

def create_reservations_for(user, listings)
  listing = listings.sample
  start_date = Faker::Date.between(listing.date_avail, listing.date_end - 1.day)
  end_date = start_date + 1.day
  user.reservations.create(listing: listing,
                       start_date: start_date,
                       end_date: end_date)
end

Listing.transaction do
  u1 = User.find(1)
  u2 = User.find(2)
  u3 = User.find(3)
  room_types = ["entire_room", "private_room", "shared_room"]
  home_types = ["full_house", "apartment", "bed_breakfast"]
  images = ["test_pic1.jpg","test_pic2.jpg","test_pic3.jpg","test_pic4.jpg","test_pic5.jpg",
    "test_pic6.jpg","test_pic7.jpg","test_pic8.jpg", "test_pic9.jpg"]
  accomodates = (1..16).to_a
  prices = (1..1000).to_a

  30.times do
    create_listings_for(u1, room_types, accomodates, prices, home_types)
  end

  60.times do
    create_listings_for(u2, room_types, accomodates, prices, home_types)
    create_listings_for(u3, room_types, accomodates, prices, home_types)
  end

  300.times do
    create_listing_images_for(u2, images)
    create_listing_images_for(u3, images)
    create_listing_images_for(u1, images)
  end

  listings = Listing.all.where("user_id != ?", u1.id)

  200.times do
    create_reservations_for(u1, listings)
  end

  u1_listings = Listing.all.where("user_id = ? ", u1.id)

  200.times do
    create_reservations_for(u2, u1_listings)
    create_reservations_for(u3, u1_listings)
  end
end
