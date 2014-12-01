Pokevisit.Views.ListingAbout = Backbone.CompositeView.extend({
  template: JST["listings/about"],
  //need to account if current user is viewing this part
  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)

    return this;
  }
})
