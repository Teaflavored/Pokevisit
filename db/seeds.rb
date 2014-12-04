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
                      description: "The best inn in the pokemon land!",
                      description_summary: "This inn is one of the best places you can bring your pokemon to. Pikachu and I come here quite often we enjoy this place alot.")
  ash.listings.first.listing_images.create(url: "/assets/inn/inn_1.jpg")
  ash.listings.first.listing_images.create(url: "/assets/inn/inn_2.jpg")

  ash.listings.first.reviews.create(user: brock, rating:3.3, review_text: "It was an enjoyable stay, ash really treated us well here. Every thing was just as we expected, except there was no Nurse Joy!")
  ash.listings.first.reviews.create(user: misty, rating:4, review_text: "I loved the inn, I'll probably try to find time to come back here again.")
  sleep(1)
  ash.listings.first.update_score


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
  brock.listings.first.reviews.create(user: oak, rating:1.5, review_text: "Bad city vibe, brock misled us on this place!")
  brock.listings.first.reviews.create(user: gary, rating:1, review_text: "Came here with grandpa, I found this place to be terrible. Way too many wild pokemon running amok. Not worth the money.")
  sleep(1)
  brock.listings.first.update_score

  misty.listings.create(roomtype: "water",
                        hometype: "sea",
                        address: "Golden Gate Bridge, San Francisco, CA, 94129",
                        date_avail: Date.new(2014, 12, 3),
                        date_end: Date.new(2020, 1, 1),
                        price: 999,
                        accomodates: 16,
                        description: "Beautiful water area to relax for the weekend!")

  misty.listings.first.listing_images.create(url: "/assets/sea/sea_1.jpg")
  misty.listings.first.reviews.create(user: ash, rating:4.3, review_text: "Beautiful place, I got to see many water pokemon. I might even become a fan myself now!")
  sleep(1)
  misty.listings.first.update_score

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
  oak.listings.first.reviews.create(user: ash, rating: 3, review_text: "Average place, I've seen many similar areas during my adventures, it's just like Route whatever!")
  oak.listings.first.reviews.create(user: brock, rating: 3.5, review_text: "Had an enjoyable time here, I saw a few cool pokemon, and not to mention we also bumped into Nurse Joy!!")
  oak.listings.first.reviews.create(user: misty, rating: 3.8, review_text: "Not a bad place, I prefer the sea much better though. The plains are kind of boring, but it was beautiful.")
  sleep(1)
  oak.listings.first.update_score

  gary.listings.create(roomtype: "city",
                       hometype: "land",
                       address: "2170 Bryant St, San Francisco, CA, 94110",
                       date_avail: Date.new(2014, 12, 3),
                       date_end: Date.new(2020, 1, 1),
                       price: 499,
                       accomodates: 16,
                       description: "Luxurious castle because you deserve it for catching them all!")
  gary.listings.first.listing_images.create(url: "/assets/castle/castle_1.png")
  gary.listings.first.reviews.create(user: ash, rating: 4, review_text: "I actually quite enjoyed the stay at my rival's castle. I mean I'm not jealous or anything, but why does he have a castle! I won the Championship!!")
  sleep(1)
  gary.listings.first.update_score

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
  brock.listings.first.reviews.create(user: ash, rating: 5, review_text: "I remember viridian forest like it was yesterday, I caught my best friend pikachu here.")
  brock.listings.first.reviews.create(user: gary, rating:3, review_text: "Good place, I love coming here to train my pokemon, it's pretty enjoyable.")
  sleep(1)
  brock.listings.first.update_score


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
  misty.listings.second.reviews.create(user: gary, rating: 3.4, review_text: "Came here with my grandpa, loved seeing the legendary pokemon. I'll probably attempt to catch it for myself one day.")
  misty.listings.second.reviews.create(user: oak, rating:5, review_text: "It's not everyday you get to see Ho-Oh. Boy I wish I had a master ball with me, would have caught that bird in a second.")
  sleep(1)
  misty.listings.second.update_score

  misty.listings.create(roomtype: "water",
                        hometype: "sea",
                        address: "San Mateo, CA",
                        date_avail: Date.new(2014, 12, 3),
                        date_end: Date.new(2020, 1, 1),
                        price: 559,
                        accomodates: 5,
                        description: "This sea area has water so clear you can see yourself")
  misty.listings.third.listing_images.create(url: "/assets/sea/clear_water.jpg")

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
  ash.listings.second.reviews.create(user: brock, rating:2, review_text: "Probably one of the most boring places I've stayed at, no girls (Nurse Joy). I want a refund.")
  sleep(1)
  ash.listings.second.update_score

  ash.listings.create(roomtype: "water",
                      hometype: "underwater",
                      address: "Teasure Island, San Francisco, CA",
                      date_avail: Date.new(2014, 12, 3),
                      date_end: Date.new(2020,1,1),
                      price: 699,
                      accomodates: 11,
                      description: "Come dive under the sea to experience all the ocean has to offer!")
  ash.listings.third.listing_images.create(url: "/assets/underwater/underwater_1.jpg")
  ash.listings.third.reviews.create(user: oak, rating:4, review_text: "Was not disappointed, this place was just as advertised. I had a great time seeing all the underwater pokemon.")
  ash.listings.third.reviews.create(user: brock, rating: 5, review_text: "Best place, we happened to bump into Nurse Joy here! Loved seeing the pokemon as well. Beautiful place!")
  ash.listings.third.reviews.create(user: misty, rating: 5, review_text: "Since I am a fan of water-type pokemon, this place was a definite go-to place for me. I'll probably take more vacations in this area.")
  sleep(1)
  ash.listings.third.update_score


  pikachu.listings.create(roomtype: "city",
                          hometype: "land",
                          address: "3282 Mission St, San Francisco, CA, 94110",
                          date_avail: Date.new(2014, 12, 3),
                          date_end: Date.new(2020,1,1),
                          price: 329,
                          accomodates: 6,
                          description: "Come for a stay in the city, You'll enjoy it! Pika Pika~")
  pikachu.listings.first.listing_images.create(url: "/assets/light_city/light_city_1.jpg")
  pikachu.listings.first.reviews.create(user: ash, rating:4, review_text: "Great city, it's nice to just stay in civilization, away from the pokemon for awhile.")
  sleep(1)
  pikachu.listings.first.update_score

  pikachu.listings.create(roomtype: "plains",
                          hometype: "land",
                          address: "Berkeley, CA",
                          date_avail: Date.new(2014, 12, 3),
                          date_end: Date.new(2020,1,1),
                          price:333,
                          accomodates:7,
                          description: "Even though this place is dry, it'still worth visiting"
                          )
  pikachu.listings.second.listing_images.create(url: "/assets/desolate/desolate_1.jpg")

  pikachu.listings.create(roomtype: "water",
                          hometype: "sea",
                          address: "San Bruno, CA",
                          date_avail: Date.new(2014, 12, 3),
                          date_end: Date.new(2020,1,1),
                          price:444,
                          accomodates:7,
                          description: "Legendary place where Lugia supposedly dwells"
                          )
  pikachu.listings.third.listing_images.create(url: "/assets/lugia/lugia_cave_1.jpg")

  pikachu.listings.create(roomtype:"city",
                          hometype: "land",
                          address: "Palo Alto, CA",
                          date_avail: Date.new(2014, 12, 3),
                          date_end: Date.new(2020,1,1),
                          price:333,
                          accomodates:7,
                          description: "City for all the night-dwellers"
                          )
  pikachu.listings.find_by(address: "Palo Alto, CA").listing_images.create(url: "/assets/city/tokyo_1.jpg")
  pikachu.listings.find_by(address: "Palo Alto, CA").listing_images.create(url: "/assets/city/tokyo_2.jpg")

  pikachu.listings.create(roomtype:"city",
                          hometype: "land",
                          address: "San Mateo, CA",
                          date_avail: Date.new(2014, 12, 3),
                          date_end: Date.new(2020,1,1),
                          price:123,
                          accomodates:7,
                          description: "Rare sky for all you people that love flying pokemon!"
                          )
  pikachu.listings.find_by(description: "Rare sky for all you people that love flying pokemon!").listing_images.create(url: "/assets/sky/sky_1.jpg")
  pikachu.listings.find_by(description: "Rare sky for all you people that love flying pokemon!").listing_images.create(url: "/assets/sky/sky_2.jpg")

end

Reservation.transaction do
  pikachu = User.find_by(email: "pikachu@pokemon.io")
  ash = User.find_by(email: "ashketchum@pokemon.io")
  pikachu.reservations.create(listing: ash.listings.first, guests: 3, start_date: Date.new(2015,1,1), end_date: Date.new(2015,6,1))
  pikachu.reservations.create(listing: ash.listings.second, guests: 3, start_date: Date.new(2015,1,1), end_date: Date.new(2015,6,1))
  pikachu.reservations.create(listing: ash.listings.third, guests: 3, start_date: Date.new(2015,1,1), end_date: Date.new(2015,6,1))
  ash.listings.first.reservations.first.approve!
  ash.listings.second.reservations.first.deny!
end
