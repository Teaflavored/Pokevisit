Pokevisit.Views.ListingIndexItem = Backbone.CompositeView.extend({
  template: JST["listings/index_item"],

  tagName: "li",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    })
    this.$el.html(renderedContent)
    return this;
  }
})
