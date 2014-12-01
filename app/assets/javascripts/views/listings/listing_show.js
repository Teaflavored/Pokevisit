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

    $(window).scroll(function(){
      var scrollPixels = $("body").scrollTop();
      if (scrollPixels > 513){
        this.$("div.pricing").addClass("fixed-pricing")
        this.$("div.show-request").addClass("fixed-request")
      } else {
        this.$("div.pricing").removeClass("fixed-pricing")
        this.$("div.show-request").removeClass("fixed-request")
      }
    })
  },

  render: function(){
    if ($("div.pricing").hasClass("fixed-pricing")){
      var addFixed = true;
    }

    var renderedContent = this.template({
      listing: this.model,
      images: this.model.images(),
      addFixed: addFixed,
    })

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})
