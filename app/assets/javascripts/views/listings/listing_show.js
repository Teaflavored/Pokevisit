Pokevisit.Views.ListingShow = Backbone.CompositeView.extend({
  template: JST["listings/show"],

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
  },

  attachCarousel: function(){
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model,
      images: this.model.images()
    })

    this.$el.html(renderedContent);
    setTimeout(function(){
      this.attachCarousel();
    }.bind(this), 0)

    return this;
  }
})
