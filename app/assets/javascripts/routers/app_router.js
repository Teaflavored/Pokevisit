Pokevisit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "checkin=:checkin&checkout=:checkout&lat=:lat&lng=:lng&guests=:guests": "main",
    "": "main",
    "own_listings": "indexYourListings",
    "reservations": "showReservations",
    "listings/new": "new",
    "listings/:id/reservations": "reservationIndex",
    "edit-profile": "editUserProfile",
    "listings/:id": "show",
  },

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    //fetch all user images and update header
    Pokevisit.allUsers.fetch({
      success: function(){
        $("img.header-img").attr("src", Pokevisit.allUsers.findWhere({id: Pokevisit.currentUserId}).get("image_url"))
      }
    })

    //set up button
  },

  main: function(checkin, checkout, lat, lng, guests){
    //how to get query params here
    window.initialQueryParams = {
      checkin: checkin,
      checkout: checkout,
      lat: lat,
      lng: lng,
      guests: guests
    }

    // need to pass queries to main view and to listing index to change filter settings inside index init
    var mainView = new Pokevisit.Views.MainView()
    this._swapView(mainView)
  },

  new: function(){
    this.setUpAutoComplete()
    var listing = new Pokevisit.Models.Listing();
    var newView = new Pokevisit.Views.ListingNew({
      model: listing
    })
    this._swapView(newView)
  },

  editUserProfile: function(){
    this.setUpAutoComplete()
    var userView = new Pokevisit.Views.User()
    //need model here?

    this._swapView(userView)
  },

  showReservations: function(){
    this.setUpAutoComplete()
    var reservationView = new Pokevisit.Views.ReservationIndex({
      collection: Pokevisit.yourPendingReservations
    })

    Pokevisit.yourPendingReservations.fetch();
    this._swapView(reservationView)
  },

  show: function(id){
    this.setUpAutoComplete()
    //need to fill with show view
    var listing = Pokevisit.listings.getOrFetch(id)
    var showView = new Pokevisit.Views.ListingShow({
      model: listing
    })
    this._swapView(showView);
  },

  indexYourListings: function(){
    this.setUpAutoComplete()
    var yourListingsView = new Pokevisit.Views.YourListings({
      collection: Pokevisit.ownListings
    })
    Pokevisit.ownListings.fetch();
    this._swapView(yourListingsView)
  },

  reservationIndex: function(id){
    this.setUpAutoComplete()
    var listing = Pokevisit.ownListings.getOrFetch(id);
    if (Pokevisit.currentUserId != listing.get("user_id")){
      return;
    }
    var listingReservationIndexView = new Pokevisit.Views.ListingReservationIndex({
      model:listing,
      collection: listing.reservations()
    })
    this._swapView(listingReservationIndexView)
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view
    this.$rootEl.html(this._currentView.render().$el)
  },

  setUpAutoComplete: function(){
    var input = document.getElementById("form-search")
    //prevent enter submitting
    $(input).keydown(function(event){
      if (event.which == 13){
        event.preventDefault();
      }
    })

    this._autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(this._autocomplete, "place_changed", function(){
      this.handlePlaceChange();
    }.bind(this))
  },

  handlePlaceChange: function(){
    var place = this._autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    Backbone.history.navigate("#/checkin=null&checkout=null&lat=" + lat +"&lng=" + lng + "&guests=1", { trigger: true })

  },

})
