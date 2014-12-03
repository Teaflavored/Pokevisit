Pokevisit.Views.ListingReview = Backbone.CompositeView.extend({
  template: JST["listings/review"],

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    })

    this.$el.html(renderedContent)

    return this;
  }
})
