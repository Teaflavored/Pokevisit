Pokevisit.Views.ListingShow = Backbone.CompositeView.extend({
  template: JST["listings/show"],

  className: "listing-show-main",

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
    this.summarySelector = "div.show-summary"

    var summaryView = new Pokevisit.Views.ListingSummary({
      model: this.model
    })
    this.addSubview(this.summarySelector, summaryView)

    var requestView = new Pokevisit.Views.ListingRequest({
      model: this.model
    })
    

    var aboutView = new Pokevisit.Views.ListingAbout({
      model: this.model
    })

    var reviewView = new Pokevisit.Views.ListingReview({
      model: this.model
    })
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
