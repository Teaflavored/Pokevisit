Pokevisit.Views.ListingReservationIndex = Backbone.CompositeView.extend({
  template: JST["reservations/listing_reservations"],

  initialize: function(){
    //this.model refers to the listing
    //this.reservation refers to the reservations
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    return this;
  }
})
