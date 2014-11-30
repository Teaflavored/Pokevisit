Pokevisit.Collections.Reservations = Backbone.Collection.extend({
  url: "/reservations",
  model: Pokevisit.Models.Reservation,
  comparator: function(reservation){
    return reservation.get("start_date")
  }
})

Pokevisit.yourPendingReservations = new Pokevisit.Collections.Reservations()
