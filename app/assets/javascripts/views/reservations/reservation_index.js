Pokevisit.Views.ReservationIndex = Backbone.CompositeView.extend({
  template: JST["reservations/index"],

  initialize: function(options){
    this.listenTo(this.collection, "add", this.addView)
    this.listenTo(this.collection, "remove", this.removeView)
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    
    return this;
  }
})
