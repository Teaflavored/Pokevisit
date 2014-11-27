Pokevisit.Collections.Reservations = Backbone.Collection.extend({
  url: "/reservations",
  model: Pokevisit.Models.Reservation
})

Pokevisit.yourPendingReservations = new Pokevisit.Collections.Reservations()
