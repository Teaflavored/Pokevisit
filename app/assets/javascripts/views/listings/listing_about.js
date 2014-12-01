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
    "click img.eraseDesc": "clearDesc",
    "keyup textarea.listing-description-textbox": "descriptionPreview"
  },

  initialize: function(){
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
    var desc = this.$("textarea.listing-description-textbox").val()
    this.model.set({ "description": desc})
    this.model.save({},{
      success: function(){

      }.bind(this)
    })
  },

  clearDesc: function(){
    this.$("textarea.listing-description-textbox").val("")
  },


  setShowState: function(){
    if (this.model.get("user_id") === Pokevisit.currentUserId){
      this.showState = "edit"
      $("button.book-button").attr("disabled", "disabled")
    } else {
      this.showState = "show"
    }
  },

  descriptionPreview: function(event){
    var content = $(event.currentTarget).val()
    if (content.length === 0){
      this.$("p.description-p").html(this.model.escape("description"))
    } else {
      this.$("p.description-p").html(content)
    }
  },

  render: function(){
    this.setShowState();
    var images = this.model.images().models
    var imagesLength = images.length
    var image = images[_.random(0, imagesLength - 1)]
    var showNotice = $("body").scrollTop() > 0 ? false : true;

    var renderedContent = this.template()({
      listing: this.model,
      image: image,
      showNotice: showNotice
    })

    this.$el.html(renderedContent)
    return this;
  }
})
;
