Pokevisit.Views.ReservationIndex = Backbone.CompositeView.extend({
  template: JST["reservations/index"],

  initialize: function(options){
    this.reservationItemsSelector = "div.reservations-index"
    this.listenTo(this.collection, "add", this.addView)
    this.listenTo(this.collection, "remove", this.removeView)


    this.collection.each(function(reservation){
      this.addView(reservation)
    }.bind(this))
  },

  addView: function(reservation){
    var reservationItemView = new Pokevisit.Views.ReservationIndexItem({
      model: reservation
    })

    this.addSubview(this.reservationItemsSelector, reservationItemView)
  },

  removeView: function(reservation){
    _.each(this.subviews(this.reservationItemsSelector), function(view){
      if(view.model.id === reservation.id){
        this.removeSubview(view);
      }
    }.bind(this))
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    this.attachSubviews()

    return this;
  }
})
