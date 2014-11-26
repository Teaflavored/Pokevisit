Pokevisit.Views.MapMain = Backbone.CompositeView.extend({
  attributes: {
    "id": "map-canvas"
  },
  initialize: function(){
    this._mapOptions = {
      center: { lat: 37.726666666, lng: -122.395555555},
      zoom: 18
    }
    this._map = new google.maps.Map(this.el, this._mapOptions)
    google.maps.event.addListener(this._map, "bounds_changed", function(){
      this.handleMapMove();
    }.bind(this))

  },

  handleMapMove: function(){
    //when map moves, need to update collection
    var bounds = this._map.getBounds()
    latRange = [bounds.Ea.k, bounds.Ea.j]
    lngRange = [bounds.va.j, bounds.va.k]

    Pokevisit.filteredListings.trigger("filterResult", {
      "filter": "location",
      data: function(listing){
          if (listing.get("lat") >= latRange[0] && listing.get("lat") <= latRange[1]
              && listing.get("lng") >= lngRange[0] && listing.get("lng") <= lngRange[1]){
            return true;
          } else {
            return false;
          }
      }
    })
  },

  render: function(){

    return this;
  }
})
