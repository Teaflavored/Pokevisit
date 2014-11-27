Pokevisit.Views.ListingShow = Backbone.CompositeView.extend({
  template: JST["listings/show"],
  
  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    })
    this.$el.html(renderedContent)

    this.attachSubviews()

    return this;
  }
})
