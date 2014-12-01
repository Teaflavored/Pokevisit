Pokevisit.Views.ListingSummary = Backbone.CompositeView.extend({
  template: JST["listings/summary"],

  className: "listing-summary",


  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var user = this.collection.findWhere({id: this.model.get("user_id")})

    var months = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"]
    var weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


    var renderedContent = this.template({
      listing: this.model,
      user: user,
      months: months,
      weekDay: weekDay
    });

    this.$el.html(renderedContent);
    return this;
  }
})
;
