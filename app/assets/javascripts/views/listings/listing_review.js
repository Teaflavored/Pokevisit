Pokevisit.Views.ListingReview = Backbone.CompositeView.extend({
  template: JST["listings/review"],

  events: {
    "keyup textarea.new-listing-review-text": "updateText",
    "click button#create-review": "createReview",
  },

  initialize: function(){
    this.reviewsSelector = "div.listing-review-content"
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.reviews(), "add", this.addView)
    this.listenTo(this.model.reviews(), "remove", this.removeView)

    this.model.reviews().each(function(review){
      this.addView(review)
    }.bind(this))

    this._reviewParams = {
      "review": {
        "listing_id": this.model.id,
        "review_text": null,
        "rating": null
      }
    }

  },

  createReview: function(event){
    event.preventDefault();
    var newReview = new Pokevisit.Models.Review();
    newReview.set(this._reviewParams);
    newReview.save({}, {
      success: function(){
        this.model.reviews().add(newReview);
        this.$("#create-review").attr("disabled", true)
      }.bind(this)
    })
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

  attachRating: function(){
    this.$("#new-listing-rating").raty({
      half: true,
      click: function(score, event){
        this._reviewParams.review.rating = score;
        this.updateButton();
      }.bind(this)
    })
  },

  updateButton: function(){
    var $button = this.$("#create-review")
    if (this._reviewParams.review.listing_id && this._reviewParams.review.rating &&
        this._reviewParams.review.review_text && this._reviewParams.review.review_text.length > 0){
      $button.removeAttr("disabled")
      $button.html("Add Review")
    } else {
      $button.attr("disabled", true)
      $button.html("Please rate/write before submitting")
    }
  },

  updateText: function(event){
    this._reviewParams.review.review_text = $(event.currentTarget).val();
    this.updateButton();
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    })
    this.$el.html(renderedContent);
    this.attachSubviews();

    setTimeout(function(){
      //rating
      this.attachRating()
    }.bind(this),0)

    return this;
  }
})
