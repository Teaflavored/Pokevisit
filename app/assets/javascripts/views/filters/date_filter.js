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
      if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
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
      this.dateFilterOut(ev);
    }.bind(this)).data('datepicker');
  },

  dateFilterIn: function(event){
    var dateIn = event.date;
    Pokevisit.filteredListings.trigger("filterResult", {
      "filter": "checkin",
      data: function(listing){
        //comparing json string of date vs. date object
        if (dateIn <= new Date(listing.get("date_end")) && dateIn >= new Date(listing.get("date_avail"))){
          //if listing ends before you want to check in
          return true;
        } else {
          return false;
        }
      }
    })
  },

  dateFilterOut: function(event){
    var dateOut = event.date;
    Pokevisit.filteredListings.trigger("filterResult", {
      "filter": "checkout",
      data: function(listing){
        if (dateOut <= new Date(listing.get("date_end")) && dateOut >= new Date(listing.get("date_avail"))){
          //if you want to checkout before it ends that's okay
          return true ;
        } else {
          return false;
        }
      }
    })
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    setTimeout(function(){
      this.attachCalendars();
    }.bind(this), 0)
    return this;
  }
})
