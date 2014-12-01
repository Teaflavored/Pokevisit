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

  events: {
    "click img.saveDesc": "saveDesc",
    "click img#eraseDesc": "clearDesc",
  },

  initialize: function(){
    debugger
    this.listenTo(this.model, "sync change:description", this.render)
    this.showState = "show"

    //adding header to notify users they have to scroll down to edit
    $(window).scroll(function(){
      var scrollPixels = $("body").scrollTop();
      this.$("div.edit-your-page-notice").css("top", (50 - scrollPixels) + "px")
      if (scrollPixels > 5){
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

  saveDesc: function(event){
    var desc = this.$("div.listing-description-textbox").html()
    this.model.set({ "description": desc})
    this.model.save({},{
      success: function(){

      }.bind(this)
    })
  },

  clearDesc: function(){
    this.$("div.listing-description-textbox").html("")
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
    debugger
    var images = this.model.images().models
    var imagesLength = images.length
    var image = images[_.random(0, imagesLength - 1)]

    var renderedContent = this.template()({
      listing: this.model,
      image: image
    })

    this.$el.html(renderedContent)
    debugger
    return this;
  }
})
;
