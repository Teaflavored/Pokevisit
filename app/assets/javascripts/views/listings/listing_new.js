Pokevisit.Views.ListingNew = Backbone.CompositeView.extend({
  template: JST["listings/new"],

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)

    return this;
  }
})
