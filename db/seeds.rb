# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
u1 = 1
u2 = 2
User.transaction do
  u1 = User.create!(email: "random@random.org", password: "password")
  u2 = User.create!(email: "random2@random.org", password: "password")
end

Listing.transaction do
  u1.listings.create!(hometype: "trouble coffee", roomtype: "trouble coffee",
                      accomodates: 1, lat: 37.760244,
                      lng: -122.505382, price: 100)

  u2.listings.create!(hometype: "trouble coffee", roomtype: "trouble coffee",
  accomodates: 1, lat: 37.760244,
  lng: -122.505382, price: 200)

  u2.listings.create!(hometype: "blah", roomtype: "blah",
  accomodates: 1, lat: 37.762628, lng: -122.494401, price: 500)
end
