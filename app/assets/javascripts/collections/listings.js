Pokevisit.Collections.Listings = Backbone.Collection.extend({
  url: "/listings",
  model: Pokevisit.Models.Listing,

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
    
  },

  getOrFetch: function(id){
    var listing;
    if (listing = this.get(id)){
      listing.fetch();
    } else {
      listing = new Pokevisit.Models.Listing({
        id: id
      })
      listing.fetch({
        success: function(){
          this.add(listing)
        }.bind(this)
      })
    }
    return listing;
  },

})

Pokevisit.listings = new Pokevisit.Collections.Listings()
Pokevisit.filteredListings = new Pokevisit.Collections.Listings()
