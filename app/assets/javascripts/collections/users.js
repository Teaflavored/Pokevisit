Pokevisit.Collections.Users = Backbone.Collection.extend({
  url: "/users",
  model: Pokevisit.Models.User
})

Pokevisit.allUsers = new Pokevisit.Collections.Users()
