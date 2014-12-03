Pokevisit.Views.User = Backbone.CompositeView.extend({
  template: JST["users/user"],

  className: "user-profile-view",

  initialize: function(){
    this.setFilepicker();
    this.listenTo(Pokevisit.allUsers, "sync", this.render)
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
      this.user.set({"image_url": Blob.url})
      this.user.save({}, {
        success: function(){
          $("img.header-img").attr("src", this.user.get("image_url"))
          this.$("img.profile-picture-pic").attr("src", this.user.get("image_url"))
        }.bind(this)
      })
      //update header
    }.bind(this));
  },

  render: function(){
    this.setFilepicker();
    this.user = Pokevisit.allUsers.findWhere({id: Pokevisit.currentUserId})

    var renderedContent = this.template({
      user: this.user
    })
    this.$el.html(renderedContent)

    setTimeout(function(){
      this.$(".tooltip").tooltipster();
    },0)

    return this;
  }
})
