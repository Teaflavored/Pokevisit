Pokevisit.Views.ListingIndex = Backbone.CompositeView.extend({
  template: JST["listings/index"],

  className: "listings-index",

  initialize: function(options){
    this.listSelector = "ul.listings";
    //sets default filter data
    this.setDefaultFilterData();
    //current date used for date filtering
    this._currentDate = new Date();

    //holds all the markers
    this._markers = [];

    this.listenTo(this.collection, "add", this.addView);
    this.listenTo(this.collection, "remove", this.removeView);
    this.listenTo(this.collection, "filterResult", this.updateFilter);

    Pokevisit.listings.fetch({
      success: function(){
        this.collection.updateFilteredCollection(this._filterData);
      }.bind(this)
    });


    this.collection.each(function(listing){
      this.addView(listing);
    }.bind(this))
  },

  updateFilter: function(filterData){
    this._filterData[filterData.filter] = filterData.data;
    this.collection.updateFilteredCollection(this._filterData);
  },

  updateMatches: function(){
    var matches = this.collection.length
    this.$("h1.matches-result").html('' + matches + " Rentals Available." )
  },

  addView: function(listing){

    var indexItemView = new Pokevisit.Views.ListingIndexItem({
      model: listing,
      _markers: this._markers
    })
    this.addSubview(this.listSelector, indexItemView);
    this.addMarker(listing);
    this.updateMatches();
  },

  addMarker: function(listing){
    var listingLocation = new google.maps.LatLng(listing.get("lat"), listing.get("lng"))
    //using airbnb's icons

    var marker = new google.maps.Marker({
      map:window.pokevisitMap,
      draggable:false,
      animation: google.maps.Animation.DROP,
      position: listingLocation,
      icon: "/assets/marker.png",
      listingId: listing.id,
    });

    var viewToShow;
    _.each(this.subviews(this.listSelector), function(view){
      if (view.model.id === listing.id){
        viewToShow = view
      }
    })
    //set content, but to another view object later

    //open window
    google.maps.event.addListener(marker, "click", function(){
      var div = document.createElement('div');
      div.id = 'infowindow-listing';
      div.appendChild(viewToShow.render().el)

      window.pokevisitMapInfo.setContent(div);
      window.pokevisitMapInfo.open(window.pokevisitMap, this)
      window.pokevisitMap.panTo(listingLocation)
    })

    this._markers.push(marker)
  },


  removeView: function(listing){
    this.updateMatches();
    for( var i = 0; i < this.subviews(this.listSelector).length; i++){
      if (this.subviews(this.listSelector)[i].model.id === listing.id){
        this.removeSubview(this.listSelector, this.subviews(this.listSelector)[i])
      }
    }

    this._markers = this._markers.filter(function(marker){
      if(marker.listingId == listing.id){
        marker.setMap(null)
      }
      return marker.listingId !== listing.id
    })
  },

  setDefaultFilterData: function(){
    this._filterData = {

      roomtype: function(){
        return true;
      },

      accomodates: function(){
        return true;
      },

      location: function(){
        return false;
      },

      checkin: function(listing){
        if (new Date(listing.get("date_avail")) < this._currentDate){
          //if date available is before current date, don't show it
          return false;
        } else {
          return true;
        }
      },

      checkout: function(listing){
        //always true for checkout
        return true;
      },

      price: function(listing){
        if (listing.get("price") >= 0 && listing.get("price") <= 1000){
          return true;
        } else {
          return false;
        }
      }
    }
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
})
