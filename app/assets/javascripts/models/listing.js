Pokevisit.Models.Listing = Backbone.Model.extend({
  urlRoot: "/listings",

  images: function(){
    this._images = this._images || new Pokevisit.Collections.Images()
    return this._images
  },

  reservations: function(){
    this._reservations = this._reservations || new Pokevisit.Collections.Reservations()
    return this._reservations
  },

  reviews: function(){
    this._reviews = this._reviews || new Pokevisit.Collections.Reviews()
    return this._reviews
  },

  parse: function(jsonResp){
    this.images().set(jsonResp.images)
    this.reservations().set(jsonResp.reservations)
    this.reviews().set(jsonResp.reviews)

    delete jsonResp.images
    delete jsonResp.reservations
    delete jsonResp.reviews

    return jsonResp
  }
})
