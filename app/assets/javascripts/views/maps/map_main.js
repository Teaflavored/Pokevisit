Pokevisit.Views.MapMain = Backbone.CompositeView.extend({
  attributes: {
    "id": "map-canvas"
  },
  initialize: function(){
    this._mapOptions = {
      center: { lat: 37.726666666, lng: -122.395555555},
      //default leave at 17
      zoom: 10
    }
    window.pokevisitMap = this._map = new google.maps.Map(this.el, this._mapOptions)
    window.pokevisitMapInfo = new google.maps.InfoWindow()
    //grabbing button
    var input = document.getElementById("form-search")
    //prevent enter submitting
    $(input).keydown(function(event){
      if (event.which == 13){
        event.preventDefault();
      }
    })

    window.pokevisitAutocomplete = this._autocomplete = new google.maps.places.Autocomplete(input);
    this._autocomplete.bindTo('bounds', this._map);


    //maps listens to bound changing
    google.maps.event.addListener(this._map, "bounds_changed", function(){
      this.handleMapMove();
    }.bind(this))

    google.maps.event.addListener(this._autocomplete, "place_changed", function(){
      this.handlePlaceChange();
    }.bind(this))

  },

  handlePlaceChange: function(){
    var place = this._autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      this._map.fitBounds(place.geometry.viewport);
    } else {
      this._map.setCenter(place.geometry.location);
      this._map.setZoom(17);
    }
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
