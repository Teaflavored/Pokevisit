Pokevisit.Views.ListingReview = Backbone.CompositeView.extend({
  template: JST["listings/review"],

  initialize: function(){
    this.reviewsSelector = "div.listing-review-content"
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.reviews(), "add", this.addView)
    this.listenTo(this.model.reviews(), "remove", this.removeView)

    this.model.reviews().each(function(review){
      this.addView(review)
    }.bind(this))

  },

  addView: function(review){
    var reviewItemView = new Pokevisit.Views.ListingReviewItem({
      model: review
    })
    this.addSubview(this.reviewsSelector, reviewItemView)
  },

  removeView: function(review){
    _.each(this.subviews(this.reviewsSelector), function(view){
      if (view.model.id === review.id){
        this.removeSubview(view)
      }
    }.bind(this))
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
