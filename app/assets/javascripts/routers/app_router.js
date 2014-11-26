Pokevisit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "main",
    "listings/new": "new",
    "listings/:id": "show"
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  main: function(){
    var mainView = new Pokevisit.Views.MainView()
    this._swapView(mainView)
  },

  new: function(){
    var newView = new Pokevisit.Views.ListingNew()
    this._swapView(newView)
  },

  show: function(id){
    //need to fill with show view
    alert(id)
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view
    this.$rootEl.html(this._currentView.render().$el)
  }

})
