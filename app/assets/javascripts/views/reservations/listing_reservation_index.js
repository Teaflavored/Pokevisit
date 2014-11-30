Pokevisit.Views.ListingReservationIndex = Backbone.CompositeView.extend({
  template: JST["reservations/listing_reservations"],

  initialize: function(){
    //this.model refers to the listing
    //this.reservation refers to the reservations
    this.listingReservationsSelector = "div.listing-reservations"

    this.listenTo(this.collection, "add", this.addView)
    this.listenTo(this.collection, "remove", this.removeView)
    this.listenTo(this.model, "sync", this.render)

    this.collection.each(function(reservation){
      this.addView(reservation)
    }.bind(this))
  },

  addView: function(reservation){
    var reservationItemView = new Pokevisit.Views.ListingReservationIndexItem({
      model: reservation
    })

    this.addSubview(this.listingReservationsSelector, reservationItemView)
  },

  removeView: function(reservation){
    _.each(this.subviews(this.listingReservationsSelector), function(view){
      if (view.model.id === reservation.id){
        this.removeSubview(view);
      }
    }.bind(this))
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    })

    this.$el.html(renderedContent)

    setTimeout(function(){
      //for jquery plugins
    }.bind(this), 0)

    return this;
  }
})
