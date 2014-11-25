Pokevisit.Collections.Listings = Backbone.Collection.extend({
  url: "/listings",
  model: Pokevisit.Models.Listing
})

Pokevisit.listings = new Pokevisit.Collections.Listings()
