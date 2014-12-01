Pokevisit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
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
  },

  main: function(){
    var mainView = new Pokevisit.Views.MainView()
    this._swapView(mainView)
  },

  new: function(){
    var listing = new Pokevisit.Models.Listing();
    var newView = new Pokevisit.Views.ListingNew({
      model: listing
    })
    this._swapView(newView)
  },

  editUserProfile: function(){
    var userView = new Pokevisit.Views.User()
    //need model here?

    this._swapView(userView)
  },

  showReservations: function(){
    var reservationView = new Pokevisit.Views.ReservationIndex({
      collection: Pokevisit.yourPendingReservations
    })

    Pokevisit.yourPendingReservations.fetch();
    this._swapView(reservationView)
  },

  show: function(id){
    //need to fill with show view
    var listing = Pokevisit.listings.getOrFetch(id)
    var showView = new Pokevisit.Views.ListingShow({
      model: listing
    })
    this._swapView(showView);
  },

  indexYourListings: function(){
    var yourListingsView = new Pokevisit.Views.YourListings({
      collection: Pokevisit.ownListings
    })
    Pokevisit.ownListings.fetch();
    this._swapView(yourListingsView)
  },

  reservationIndex: function(id){

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
  }

})
;
