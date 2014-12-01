Pokevisit = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},

  initialize: function(){
    new Pokevisit.Routers.AppRouter({
      $rootEl: $("div#main")
    })
    Backbone.history.start()
  }
}
;
