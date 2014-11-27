Pokevisit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "main",
    "own_listings": "indexYourListings",
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
    var listing = Pokevisit.listings.getOrFetch(id)
    var showView = new Pokevisit.Views.ListingShow({
      model: listing
    })
    this._swapView(showView);
  },

  indexYourListings: function(){
    alert('hi')

  },

  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view
    this.$rootEl.html(this._currentView.render().$el)
  }

})
