Pokevisit.Views.DateFilter = Backbone.CompositeView.extend({
  template: JST["filters/date"],

  className: "date-filter filter",


  attachCalendars: function(){
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    var checkin = this.$('#check-in-filter').datepicker({
      onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {

      //need to trigger for checkin
      this.dateFilterIn(ev);
      if (!checkout.date || ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
        this.dateFilterOut(newDate)
      }
      checkin.hide();
      this.$('#check-out-filter')[0].focus();
    }.bind(this)).data('datepicker');

    var checkout = this.$('#check-out-filter').datepicker({
      onRender: function(date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      checkout.hide();
      //need to trigger for checkout
      this.dateFilterOut(ev.date);
    }.bind(this)).data('datepicker');
  },

  dateFilterIn: function(event){
    var dateIn = event.date;
    Pokevisit.filteredListings.trigger("filterResult", {
      "filter": "checkin",
      data: function(listing){
        //if no dates then return true;
        //comparing json string of date vs. date object
        if (dateIn.valueOf() <= new Date(listing.get("date_end")).valueOf() && dateIn.valueOf() >= new Date(listing.get("date_avail")).valueOf()){
          //if listing ends before you want to check in
          return true;
        } else {
          return false;
        }
      }
    })
  },

  dateFilterOut: function(date){
    var dateOut = date;
    Pokevisit.filteredListings.trigger("filterResult", {
      "filter": "checkout",
      data: function(listing){

        if (dateOut.valueOf() <= new Date(listing.get("date_end")).valueOf() && dateOut.valueOf() >= new Date(listing.get("date_avail")).valueOf()){
          //if you want to checkout before it ends that's okay
          return true ;
        } else {
          return false;
        }
      }
    })
  },

  selectFilter: function(){
    this.$("#select-accomodates-filter").on("change", function(event){

      var optionValue = $(event.currentTarget).val();
      Pokevisit.filteredListings.trigger("filterResult", {
        "filter": "accomodates",
        data: function(listing){
          if (listing.get("accomodates") >= optionValue){
            return true;
          } else {
            return false;
          }
        }

      })
    }.bind(this))
  },

  //handle any query params
  doQueryThings: function(){
    if (window.initialQueryParams){
      if (window.initialQueryParams.checkin && window.initialQueryParams.checkin !== "null"){
        var checkinDate = new Date(parseInt(window.initialQueryParams.checkin))
        $("#check-in-filter").datepicker('setValue', checkinDate)
        this.dateFilterIn({ date: checkinDate })
      }

      if (window.initialQueryParams.checkout && window.initialQueryParams.checkout !== "null"){
        var checkoutDate = new Date(parseInt(window.initialQueryParams.checkout))
        $("#check-out-filter").datepicker('setValue', checkoutDate)
        this.dateFilterOut(checkoutDate)
      }

      if (window.initialQueryParams.guests){
        var guests = parseInt(window.initialQueryParams.guests)
        $('#select-accomodates-filter').selectpicker('val', guests)

        Pokevisit.filteredListings.trigger("filterResult", {
          "filter": "accomodates",
          data: function(listing){
            if (listing.get("accomodates") >= guests){
              return true;
            } else {
              return false;
            }
          }

        })
      }

      if (window.initialQueryParams.lat && window.initialQueryParams.lng &&
          window.initialQueryParams.lat !== "null" && window.initialQueryParams.lng !== "null"){

        window.pokevisitMap.setCenter({lat: parseFloat(window.initialQueryParams.lat), lng: parseFloat(window.initialQueryParams.lng)})
        window.pokevisitMap.setZoom(11)
      }

      //delete them after using
      window.initialQueryParams = null;
    }
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)


    setTimeout(function(){
      this.attachCalendars();
      this.$("#select-accomodates-filter").selectpicker()
      this.selectFilter();

      setTimeout(function(){
        this.doQueryThings();
      }.bind(this), 0)

    }.bind(this), 0)
    return this;
  }
})
