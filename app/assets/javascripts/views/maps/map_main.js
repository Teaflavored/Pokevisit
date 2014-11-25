Pokevisit.Views.Map = Backbone.CompositeView.extend({
  template: JST["maps/map"],

  initialize: function(options){
    this.mapViewSelector = ".map-view"
    var mapMainView = new Pokevisit.Views.MapMain()
    this.addSubview(this.mapViewSelector, mapMainView)
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },



})
