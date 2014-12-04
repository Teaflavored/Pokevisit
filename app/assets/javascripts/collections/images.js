Pokevisit.Collections.Images = Backbone.Collection.extend({
  url: "/listing_images",
  model: Pokevisit.Models.Image,
  comparator: function(image){
    return image.id
  }
})
