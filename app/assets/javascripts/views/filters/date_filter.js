Pokevisit.Views.DateFilter = Backbone.CompositeView.extend({
  template: JST["filters/date"],

  className: "date-filter filter",


  attachCalendars: function(){
    this.$("#check-in-filter").datepicker({
      onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
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
