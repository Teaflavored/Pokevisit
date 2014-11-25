Pokevisit.Collections.Listings = Backbone.Collection.extend({
  url: "/listings",
  model: Pokevisit.Models.Listing,

  initialize: function(){

  },

  //updateFilteredCollections
  updateFilteredCollection: function(filterData){
    //need Pokevisit.listings to pass every filter
    var filterCondition = function(listing){
      for(key in filterData){
        debugger
        if(filterData[key](listing) === false){
          return false;
        }
      }

      return true;
    }

    Pokevisit.filteredListings.set(Pokevisit.listings.filter(filterCondition))
  },

  filterByCoords: function(latLngRangeObj){
    //return collection filtered by range of coordinates
    return this;
  }
})

Pokevisit.listings = new Pokevisit.Collections.Listings()
Pokevisit.filteredListings = new Pokevisit.Collections.Listings()
