Pokevisit.Views.MapMain = Backbone.CompositeView.extend({
  attributes: {
    "id": "map-canvas"
  },
  initialize: function(){
    this._mapOptions = {
      center: { lat: 37.7269379, lng: -122.3957547},
      zoom: 17
    }
    this._map = new google.maps.Map(this.el, this._mapOptions)
    google.maps.event.addListener(this._map, "center_changed", function(){
      this.handleMapMove();
    }.bind(this))
  },

  handleMapMove: function(){
    //when map moves, need to update collection
    var bounds = this._map.getBounds();
    latRange = [bounds.Ea.j, bounds.Ea.k];
    lngRange = [bounds.va.j, bounds.va.k];
    console.log(latRange)
    console.log(lngRange)
    Pokevisit.filteredListings.trigger("filter", {
      "filter": "location",
      // data: function(listing){
      //   if(listing.get("lat") console.)
      // }
    })
  },

  render: function(){

    return this;
  }
})
