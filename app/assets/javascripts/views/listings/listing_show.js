Pokevisit.Views.ListingShow = Backbone.CompositeView.extend({
  template: JST["listings/show"],

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)

    var summaryView = new Pokevisit
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model,
      images: this.model.images()
    })

    this.$el.html(renderedContent);
    return this;
  }
})
