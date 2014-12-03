# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.transaction do
  User.create!(email: "AshKetchum@pokemon.io", password: "password", image_url: "/assets/profile_pics/ash_profile_pic.png")
  User.create!(email: "Pikachu@pokemon.io", password: "password", image_url: "/assets/profile_pics/pikachu_profile_pic.png")
  User.create!(email: "Brock@pokemon.io", password: "password", image_url: "/assets/profile_pics/brock_profile_pic.png")
  User.create!(email: "Misty@pokemon.io", password: "password", image_url: "/assets/profile_pics/misty_profile_pic.png")
  User.create!(email: "ProfessorOak@pokemon.io", password: "password", image_url: "/assets/profile_pics/professor_oak_profile_pic.jpg")
  User.create!(email: "Gary@pokemon.io", password: "password", image_url: "/assets/profile_pics/gary_profile_pic.png")
end

Listing.transaction do
  ash = User.find_by(email: "ashketchum@pokemon.io")
  pikachu = User.find_by(email: "pikachu@pokemon.io")
  brock = User.find_by(email: "brock@pokemon.io")
  misty = User.find_by(email: "misty@pokemon.io")
  oak = User.find_by(email: "professoroak@pokemon.io")
  gary = User.find_by(email: "gary@pokemon.io")

  room_types = ["water", "plains", "city"]

  home_types = ["land", "sea", "underwater"]

  ash.listings.create(roomtype: "city",
                      hometype: "land",
                      address: "888 Brannan St, San Francisco, CA",
                      date_avail: Date.new(2014, 12, 3),
                      date_end: Date.new(2020,1,1),
                      price: 200,
                      accomodates: 8,
                      description: "The best inn in the pokemon land!")
  ash.listings.first.listing_images.create(url: "/assets/inn/inn_1.jpg")
  ash.listings.first.listing_images.create(url: "/assets/inn/inn_2.jpg")


  brock.listings.create(roomtype: "city",
                        hometype: "land",
                        address: "3809 Geary Blvd, San Francisco, CA, 94118",
                        date_avail: Date.new(2014, 12, 3),
                        date_end: Date.new(2020, 1, 1),
                        price: 400,
                        accomodates: 15,
                        description: "Beautiful city area for you and your pokemon to relax!")
  brock.listings.first.listing_images.create(url: "/assets/city/city_1.jpg")
  brock.listings.first.listing_images.create(url: "/assets/city/city_2.jpg")

  misty.listings.create(roomtype: "water",
                        hometype: "sea",
                        address: "Golden Gate Bridge, San Francisco, CA, 94129",
                        date_avail: Date.new(2014, 12, 3),
                        date_end: Date.new(2020, 1, 1),
                        price: 999,
                        accomodates: 16,
                        description: "Beautiful water area to relax for the weekend!")

  misty.listings.first.listing_images.create(url: "/assets/sea/sea_1.jpg")

  oak.listings.create(roomtype: "plains",
                      hometype: "land",
                      address: "94 Judah st, San Francisco, CA, 94122",
                      date_avail: Date.new(2014, 12, 3),
                      date_end: Date.new(2020, 1, 1),
                      price: 499,
                      accomodates: 5,
                      description: "Wide open area for you to enjoy!")

  oak.listings.first.listing_images.create(url: "/assets/plains/plains_1.jpg")
  oak.listings.first.listing_images.create(url: "/assets/plains/plains_2.jpg")

  gary.listings.create(roomtype: "city",
                       hometype: "land",
                       address: "2170 Bryant St, San Francisco, CA, 94110",
                       date_avail: Date.new(2014, 12, 3),
                       date_end: Date.new(2020, 1, 1),
                       price: 499,
                       accomodates: 16,
                       description: "Luxurious castle because you deserve it for catching them all!")
  gary.listings.first.listing_images.create(url: "/assets/castle/castle_1.png")

  brock.listings.create(roomtype: "plains",
                        hometype: "land",
                        address: "406 Dewey Blvd, San Francisco, CA, 94116",
                        date_avail: Date.new(2014, 12, 3),
                        date_end: Date.new(2020, 1, 1),
                        price: 333,
                        accomodates: 6,
                        description: "Catch a pikachu here! Everyone does :)")
  brock.listings.second.listing_images.create(url: "/assets/viridian_forest/viridian_1.jpg")
  brock.listings.second.listing_images.create(url: "/assets/viridian_forest/viridian_2.jpg")

  misty.listings.create(roomtype: "city",
                        hometype: "land",
                        address: "127 Serramonte Center, Daly City, CA, 94015",
                        date_avail: Date.new(2014, 12, 3),
                        date_end: Date.new(2020, 1, 1),
                        price: 49,
                        accomodates: 5,
                        description: "Legendary tower for you to view the Ho-Oh")

  misty.listings.second.listing_images.create(url: "/assets/ecruteak/ecruteak_1.jpg")
  misty.listings.second.listing_images.create(url: "/assets/ecruteak/ecruteak_2.png")

  ash.listings.create(roomtype: "plains",
                      hometype: "land",
                      address: "3420 Judah St, San Francisco, CA, 94122",
                      date_avail: Date.new(2014, 12, 3),
                      date_end: Date.new(2020,1,1),
                      price: 250,
                      accomodates: 8,
                      description: "Plains so wide your eyes can't see the end!")
  ash.listings.second.listing_images.create(url: "/assets/plains/plains_3.jpg")
  ash.listings.second.listing_images.create(url: "/assets/plains/plains_4.jpg")
  ash.listings.second.listing_images.create(url: "/assets/plains/plains_5.jpg")

  ash.listings.create(roomtype: "water",
                      hometype: "underwater",
                      address: "Teasure Island, San Francisco, CA",
                      date_avail: Date.new(2014, 12, 3),
                      date_end: Date.new(2020,1,1),
                      price: 699,
                      accomodates: 11,
                      description: "Come dive under the sea to experience all the ocean has to offer!")
  ash.listings.third.listing_images.create(url: "/assets/underwater/underwater_1.jpg")


  pikachu.listings.create(roomtype: "city",
                          hometype: "land",
                          address: "3282 Mission St, San Francisco, CA, 94110",
                          date_avail: Date.new(2014, 12, 3),
                          date_end: Date.new(2020,1,1),
                          price: 329,
                          accomodates: 6,
                          description: "Come for a stay in the city, You'll enjoy it! Pika Pika~")
  pikachu.listings.first.listing_images.create(url: "/assets/light_city/light_city_1.jpg")

  
end
