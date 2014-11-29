Pokevisit.Views.ListingRequest = Backbone.CompositeView.extend({
  template: JST["listings/request"],

  //gray out button until person selects date and guests
  events: {
    "click button.book-button": "createReservation"
  },

  initialize: function(){
    //gray out button
    this.listenTo(this.model, "sync", this.render)
    this._checkIn = null;
    this._checkOut = null;
  },

  changeButtonText: function(){
    if(this._checkIn && this._checkOut){
      this.$("button.book-button").html("Request to Book");
    }
  },

  attachDate: function(){
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    var checkin = this.$('#check-in-select').datepicker({
      onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {

      //need to update checkin and update button
      this._checkIn = ev.date;
      this.changeButtonText();

      if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
      }
      checkin.hide();
      this.$('#check-out-select')[0].focus();
    }.bind(this)).data('datepicker');
    var checkout = this.$('#check-out-select').datepicker({
      onRender: function(date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      checkout.hide();
      //need to update checkout and update button

      this._checkOut = ev.date;
      this.changeButtonText();

    }.bind(this)).data('datepicker');
  },

  attachSelect: function(){
    this.$("#select-accomodates").selectpicker()
  },

  createReservation: function(event){
    event.preventDefault();
    if(!this._checkIn || !this._checkOut){
      return;
    } else {
      var guests = this.$("#select-accomodates").val();

      var reservationParams = {
        "reservation": {
          "listing_id": this.model.id,
          "start_date": this._checkIn,
          "end_date": this._checkOut,
          "guests": guests
        }
      }

      var newReservation = new Pokevisit.Models.Reservation();
      newReservation.set(reservationParams)
      newReservation.save({}, {
        success: function(){
          //successful reservation
          yourPendingReservations.add(newReservation)
        }.bind(this)
      })
    }
  },

  render: function(){
      var renderedContent = this.template({
      listing: this.model
    });

    this.$el.html(renderedContent);

    setTimeout(function(){
      this.attachDate()
      this.attachSelect()
    }.bind(this), 0)

    return this;
  }
})
