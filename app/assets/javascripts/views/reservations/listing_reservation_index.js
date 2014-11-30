Pokevisit.Views.ListingReservationIndex = Backbone.CompositeView.extend({
  template: JST["reservations/listing_reservations"],

  events: {
    "click button.approve-reservation": "approveReservation",
    "click button.deny-reservation": "denyReservation"
  },

  initialize: function(){
    //this.model refers to the listing
    //this.reservation refers to the reservations
    this.listingReservationsSelector = "div.listing-reservations"

    this.listenTo(this.collection, "add", this.addView)
    this.listenTo(this.collection, "remove", this.removeView)
    this.listenTo(this.model, "sync", this.render)

    this.collection.each(function(reservation){
      if (reservation.get("status") === "PENDING"){
        this.addView(reservation)
      }

    }.bind(this))
  },

  approveReservation: function(event){
    event.preventDefault();
    var reservationId = $(event.currentTarget).data("reservation")
    var reservationView;
    _.each(this.subviews(this.listingReservationsSelector), function(view){
      if (view.model.id === reservationId){
        reservationView = view;
      }
    })

    $.ajax({
      url: "/reservations/" + reservationId +"/approve",
      type: "GET",
      dataType: "json",
      success: function(){
        reservationView.$el.fadeOut(1000, _.bind(reservationView.remove, reservationView) );
        this.model.fetch({
          success: function(){
            this.updateReservationViews(reservationView);
          }.bind(this)
        });
        //also need to remove all the other none pending reservations
      }.bind(this)
    })
  },

  denyReservation: function(event){
    event.preventDefault();
  },

  updateReservationViews: function(deletedView){
    _.each(this.subviews(this.listingReservationsSelector), function(view){
      var view = view;
      if(view.model.id !== deletedView.model.id){
        //remove all these views if they have status of non pending
        if (view.model.get("status") != "PENDING"){
          view.$el.fadeOut(1000, _.bind(view.remove, view));
        }
      }
    }.bind(this))
  },

  addView: function(reservation){
    if (reservation.get("status") === "PENDING"){
      var reservationItemView = new Pokevisit.Views.ListingReservationIndexItem({
        model: reservation
      })

      this.addSubview(this.listingReservationsSelector, reservationItemView)
    }
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
    this.attachSubviews();

    setTimeout(function(){
      //for jquery plugins
    }.bind(this), 0)

    return this;
  }
})
