Pokevisit.Views.Map = Backbone.View.extend({
  template: JST["maps/map"],

  className: "map-view",

  initialize: function(){
    this._mapOptions = {
      center: { lat: 37.7269379, lng: -122.3957547},
      zoom: 17
    }
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)

    this.$mapCanvas = this.$("div#map-canvas")
    new google.maps.Map(this.$mapCanvas[0], this._mapOptions)

    return this;
  }
})
