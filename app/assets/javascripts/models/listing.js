Pokevisit.Models.Listing = Backbone.Model.extend({
  urlRoot: "/listings",

  images: function(){
    this._images = this._images || new Pokevisit.Collections.Images()
    return this._images
  },

  parse: function(jsonResp){
    this.images().set(jsonResp.images)
    delete jsonResp.images
    return jsonResp
  }
})
