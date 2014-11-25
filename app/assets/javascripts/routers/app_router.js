Pokevisit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "main"
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  main: function(){
    var mainView = new Pokevisit.Views.MainView()
    this._swapView(mainView)
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view
    this.$rootEl.html(this._currentView.render().$el)
  }

})
