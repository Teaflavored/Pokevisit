Pokevisit.Views.ListingAbout = Backbone.CompositeView.extend({
  template: function(){
    if (this.showState === "show"){
      return JST["listings/about"]
    } else if (this.showState === "edit"){
      return JST["listings/about_edit"]
    }
  },

  //need to account if current user is viewing this part
  className: "listing-about-main container",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
    this.showState = "show"

    $(window).scroll(function(){
      var scrollPixels = $("body").scrollTop();
      this.$("div.edit-your-page-notice").css("top", (50 - scrollPixels) + "px")
      if (scrollPixels > 0){
        this.$("div.edit-your-page-notice").addClass("fade")
        setTimeout(function(){
          this.$("div.edit-your-page-notice").on("transitionend", function(){
            this.$("div.edit-your-page-notice").addClass("hide")
          }.bind(this))
        }.bind(this),0)

      } else {
        this.$("div.edit-your-page-notice").removeClass("fade")
        this.$("div.edit-your-page-notice").removeClass("hide")
      }
    })
  },

  setShowState: function(){
    if (this.model.get("user_id") === Pokevisit.currentUserId){
      this.showState = "edit"
      $("button.book-button").attr("disabled", "disabled")
    } else {
      this.showState = "show"
    }
  },

  render: function(){
    this.setShowState();

    var images = this.model.images().models
    var imagesLength = images.length
    var image = images[_.random(0, imagesLength - 1)]

    var renderedContent = this.template()({
      listing: this.model,
      image: image
    })
    this.$el.html(renderedContent)

    return this;
  }
})
