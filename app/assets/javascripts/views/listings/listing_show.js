Pokevisit.Views.ListingShow = Backbone.CompositeView.extend({
  template: JST["listings/show"],

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
    this.summarySelector = "div.show-summary"
    this.requestSelector = "div.show-request"
    this.aboutSelector = "div.show-about"
    this.reviewSelector = "div.show-review"

    var summaryView = new Pokevisit.Views.ListingSummary({
      collection: Pokevisit.allUsers,
      model: this.model
    })
    this.addSubview(this.summarySelector, summaryView)

    var requestView = new Pokevisit.Views.ListingRequest({
      model: this.model
    })
    this.addSubview(this.requestSelector, requestView)

    var aboutView = new Pokevisit.Views.ListingAbout({
      model: this.model
    })
    this.addSubview(this.aboutSelector, aboutView)

    var reviewView = new Pokevisit.Views.ListingReview({
      model: this.model
    })
    this.addSubview(this.reviewSelector, reviewView)
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model,
      images: this.model.images()
    })

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})
