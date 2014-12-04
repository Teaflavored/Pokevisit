Pokevisit.Views.ListingReviewItem = Backbone.CompositeView.extend({
  template: JST["listings/review_item"],

  render: function(){
    var renderedContent = this.template({
      review: this.model
    })

    this.$el.html(renderedContent)
    
    return this;
  }
})
