Pokevisit.Views.ListingReservationIndexItem = Backbone.CompositeView.extend({
  template: JST["reservations/listing_reservations_item"],

  className: "listing-reservation-item",

  render: function(){

    var months = ["January", "February", "March", "April", "May",
                  "June", "July", "August", "September", "October", "November", "December"]
    var weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    var image = Pokevisit.allUserImages.findWhere({user_id: this.model.get("user_id")})

    var renderedContent = this.template({
      reservation: this.model,
      image: image,
      months: months,
      weekDay: weekDay
    })

    this.$el.html(renderedContent)

    return this;
  }
})
