Pokevisit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "main"
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  main: function(){

  },

  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view
    this.$rootEl.html(this._currentView.render().$el)
  }

})
