Pokevisit.Views.ListingReservationIndexItem = Backbone.CompositeView.extend({
  template: JST["reservations/listing_reservations_item"],

  render: function(){
    var renderedContent = this.template({
      reservation: this.model
    })
    this.$el.html(renderedContent)

    return this;
  }
})
