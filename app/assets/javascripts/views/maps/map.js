Pokevisit.Views.Map = Backbone.View.extend({
  template: JST["maps/map"],

  className: "map-view",

  initialize: function(){
    this._mapOptions = {
      center: { lat: -34.397, lng: 150.644},
      zoom: 12
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
