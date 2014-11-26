Pokevisit.Collections.Listings = Backbone.Collection.extend({
  url: "/listings",
  model: Pokevisit.Models.Listing,

  initialize: function(){

  },

  updateFilteredCollection: function(filterData){
    //need Pokevisit.listings to pass every filter
    var filterCondition = function(listing){
      for(key in filterData){
        if(filterData[key](listing) === false){
          return false;
        }
      }

      return true;
    }

    this.set(Pokevisit.listings.filter(filterCondition))
  }
})

Pokevisit.listings = new Pokevisit.Collections.Listings()
Pokevisit.filteredListings = new Pokevisit.Collections.Listings()
