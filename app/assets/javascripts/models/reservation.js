Pokevisit.Models.Reservation = Backbone.Model.extend({
  urlRoot: "/reservations",
  comparator: function(reservation){
    return reservation.get("start_date")
  }
})
