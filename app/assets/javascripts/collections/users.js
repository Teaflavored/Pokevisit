Pokevisit.Collections.Users = Backbone.Collection.extend({
  url: "/users",
  model: Pokevisit.Models.User,
  getOrFetch: function(id){
    if (this.find(user)){
      user.fetch()
    } else {
      var user = new Pokevisit.Models.User({
        id: id
      })
      user.fetch({
        success: function(){
          this.add(user)
        }.bind(this)
      })
    }

    return user;
  }
})

Pokevisit.allUsers = new Pokevisit.Collections.Users()
