Pokevisit.Views.User = Backbone.CompositeView.extend({
  template: JST["users/user"],

  className: "user-profile-view",

  initialize: function(){
    this.setFilepicker();
    this.listenTo(Pokevisit.allUserImages, "sync", this.render)
  },

  events: {
    "click h1.change-profile-picture": "uploadPicture",
    "click img.profile-picture-pic": "uploadPicture"
  },

  setFilepicker: function(){
    if (filepicker){
      //if loaded set key
      filepicker.setKey("AJXpnUispSeOzkYcpSa8Kz");
    }
  },

  uploadPicture: function(){
    filepicker.pick(function(Blob){
      //update the picture
      this.userImage.set({url: Blob.url})
      this.userImage.save({}, {
        success: function(){
          $("img.header-img").attr("src", userImage.get("url"))
          this.$("img.profile-picture-pic").attr("src", userImage.get("url"))
        }
      })
      //update header
    });
  },

  render: function(){
    this.setFilepicker();
    this.userImage = Pokevisit.allUserImages.findWhere({user_id: Pokevisit.currentUserId})

    var renderedContent = this.template({
      image: this.userImage
    })
    this.$el.html(renderedContent)

    return this;
  }
})
