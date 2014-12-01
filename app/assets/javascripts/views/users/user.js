Pokevisit.Views.User = Backbone.CompositeView.extend({
  template: JST["users/user"],

  initialize: function(){
    this.setFilepicker();
  },

  events: {
    "click button.change-profile-picture": "uploadPicture"
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
      var userImage = Pokevisit.allUserImages.findWhere({user_id: Pokevisit.currentUserId})
      userImage.set({url: Blob.url})
      userImage.save({}, {
        success: function(){
          $("img.header-img").attr("src", userImage.get("url"))
        }
      })
      //update header
    });
  },

  render: function(){
    this.setFilepicker();
    var renderedContent = this.template()
    this.$el.html(renderedContent)

    return this;
  }
})
