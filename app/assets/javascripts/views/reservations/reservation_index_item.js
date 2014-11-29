Pokevisit.Views.ReservationIndexItem = Backbone.CompositeView.extend({
  template: JST["reservations/index_item"],

  className: "reservation-index-item",

  events: {
    "click .reservation-image img": "redirectToListingPage"
  },

  initialize: function(options){
    this.listing = Pokevisit.listings.getOrFetch(this.model.get("listing_id"))
    this.listenTo(this.listing, "sync", this.render)
    this.listenTo(this.model, "change:status", this.render)
  },

  redirectToListingPage: function(event){
    Backbone.history.navigate("#/listings/" + this.listing.id, { trigger: true })
  },

  render: function(){
    if (!this.listing.get("user_id")){
      //that means listing isn't fetched, just return this with empty element
      return this;
    }
    var status;
    if (this.model.get("status") === "APPROVED"){
      status = "approved"
    } else if (this.model.get("status") === "DENIED"){
      status = "denied"
    } else if (this.model.get("status") === "PENDING"){
      status = "pending"
    }

    var renderedContent = this.template({
      reservation: this.model,
      status: status,
      listing: this.listing,
      img: this.listing.images().models[0]
    })

    this.$el.html(renderedContent)
    return this;
  },

})
