# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.transaction do
  User.create!(email: "AshKetchum@pokemon.io", password: "password", image_url: "/assets/profile_pic/ash_profile_pic.png")
  User.create!(email: "Pikachu@pokemon.io", password: "password", image_url: "/assets/profile_pic/pikachu_profile_pic.png")
  User.create!(email: "Brock@pokemon.io", password: "password", image_url: "/assets/profile_pic/brock_profile_pic.png")
  User.create!(email: "Misty@pokemon.io", password: "password", image_url: "/assets/profile_pic/misty_profile_pic.png")
  User.create!(email: "ProfessorOak@pokemon.io", password: "password", image_url: "/assets/profile_pic/professor_oak_profile_pic.png")
  User.create!(email: "Gary@pokemon.io", password: "password", image_url: "/assets/profile_pic/gary_profile_pic.png")
end

Listing.transaction do
  ash = User.find_by(email: "ashketchum@pokemon.io")
  pikachu = User.find_by(email: "pikachu@pokemon.io")
  brock = User.find_by(email: "brock@pokemon.io")
  misty = User.find_by(email: "misty@pokemon.io")
  oak = User.find_by(email: "professoroak@pokemon.io")
  gary = User.find_by(email: "gary@pokemon.io")

  room_types = ["house", "plains", "city"]

  home_types = ["Land", "Sea", "Underwater"]

  ash.listings.create(roomtype: "house",
                      hometype: "land",
                      address: "888 Brannan St, San Francisco, CA",
                      date_avail: Date.new(2014, 12, 3),
                      date_end: Date.new(2020,1,1),
                      price: 200,
                      accomodates: 8)
  ash.listings.first.listing_images.create(url: "/assets/inn/inn_1.jpg")
  ash.listings.first.listing_images.create(url: "/assets/inn/inn_2.jpg")


  brock.listings.create(roomtype: "city",
                        hometype: "land",
                        address: "3809 Geary Blvd, San Francisco, CA, 94118",
                        date_avail: Date.new(2014, 12, 3),
                        date_end: Date.new(2020, 1, 1),
                        price: 400,
                        accomodates: 15)
  brock.listings.first.listing_images.create(url: "/assets/city/city_1.jpg")
  brock.listings.first.listing_images.create(url: "/assets/city/city_2.jpg")

end
