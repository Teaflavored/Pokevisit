Pokevisit.Views.ListingRequest = Backbone.CompositeView.extend({
  template: JST["listings/request"],

  //gray out button until person selects date and guests
  events: {
    "click button.book-button": "createReservation"
  },

  initialize: function(){
    //gray out button
    this.listenTo(this.model, "sync", this.render)
    this._checkIn = undefined;
    this._checkOut = undefined;

    //need to go through reservations for a listing then see if any of date ranges
    //have been accepted


  },

  attachDate: function(){

    this.reservations = this.model.reservations();
    this.unavailableDayRanges = [];

    this.reservations.each(function(reservation){
      if (reservation.escape("status") == "APPROVED"){
        this.unavailableDayRanges.push([new Date(reservation.get("start_date")), new Date(reservation.get("end_date"))])
      }
    }.bind(this))

    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var listing = this.model;
    var dayRanges = this.unavailableDayRanges;

    var checkin = this.$('#check-in-select').datepicker({
      onRender: function(date) {
        dateFlag = ""
        _.each(dayRanges, function(dayRange){
          if(date >= dayRange[0] && date<= dayRange[1]){
            dateFlag = "disabled";
          }
        });

        if(dateFlag === "disabled"){
          return dateFlag;
        }

        if (date.valueOf() < new Date(listing.escape("date_avail")).valueOf() ||
            date.valueOf() > new Date(listing.escape("date_end"))) {
          return "disabled";
        } else {
          return "";
        }
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {

      //need to update checkin and update button
      this._checkIn = ev.date;

      //must make sure date is within the listing's selected dates

      if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
        this._checkOut = newDate
      }
      checkin.hide();

      this.$('#check-out-select')[0].focus();
    }.bind(this)).data('datepicker');

    //set a default for the checkin-date
    this.$('#check-in-select').datepicker("setValue", new Date(listing.escape("date_avail")))
    this._checkIn = new Date(listing.escape("date_avail"));

    var checkout = this.$('#check-out-select').datepicker({
      onRender: function(date) {
        dateFlag = ""
        _.each(dayRanges, function(dayRange){
          if(date >= dayRange[0] && date<= dayRange[1]){
            dateFlag = "disabled";
          }
        });

        if(dateFlag === "disabled"){
          return dateFlag;
        }

        if (date.valueOf() > new Date(listing.escape("date_end").valueOf()) ||
            date.valueOf() < new Date(listing.escape("date_avail")).valueOf()){
          return "disabled";
        } else {
          return "";
        }
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
      }.bind(this)
    }).on('changeDate', function(ev) {
      checkout.hide();
      //need to update checkout and update button

      this._checkOut = ev.date;

    }.bind(this)).data('datepicker');

    var listingStartDate = new Date(listing.escape("date_avail"));
    listingStartDate.setDate(listingStartDate.getDate() + 1);
    this.$('#check-out-select').datepicker("setValue", listingStartDate);
    this._checkOut = listingStartDate;

  },

  attachSelect: function(){
    this.$("#select-accomodates").selectpicker()
  },

  createReservation: function(event){
    event.preventDefault();
    var $button = $(event.currentTarget)
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
          Pokevisit.yourPendingReservations.add(newReservation)
          this.changeButtonSuccessCSS();
        }.bind(this)
      })
    }

  },


  changeButtonSuccessCSS: function(){
    this.$("button.book-button").html("Successful Reservation")
    this.$("button.book-button").css("background", "#007a87")
    this.$("button.book-button").css("border-color", "#007a87")
    this.$("button.book-button").css("border-bottom-color", "#004f58")
  },

  render: function(){
      var renderedContent = this.template({
      listing: this.model
    });

    this.$el.html(renderedContent);

    setTimeout(function(){
      if( this.model.get("user_id")){
        this.attachDate()
      }
      this.attachSelect()
    }.bind(this), 0)

    return this;
  }
})
