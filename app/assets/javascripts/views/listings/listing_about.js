Pokevisit.Views.ListingAbout = Backbone.CompositeView.extend({
  template: JST["listings/about"],
  //need to account if current user is viewing this part
  className: "listing-about-main container",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var images = this.model.images().models
    var imagesLength = images.length
    var image = images[_.random(0, imagesLength - 1)]

    var renderedContent = this.template({
      listing: this.model,
      image: image
    })
    this.$el.html(renderedContent)

    return this;
  }
})
