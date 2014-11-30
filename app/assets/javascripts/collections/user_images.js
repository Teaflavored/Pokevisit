Pokevisit.Collections.UserImages = Backbone.Collection.extend({
  url: "/user_images",
  model: Pokevisit.Models.UserImage
})

Pokevisit.allUserImages = new Pokevisit.Collections.UserImages();
