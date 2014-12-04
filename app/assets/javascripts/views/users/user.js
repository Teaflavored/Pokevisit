Pokevisit.Views.User = Backbone.CompositeView.extend({
  template: JST["users/user"],

  className: "user-profile-view",

  initialize: function(){
    this.setFilepicker();
    this.listenTo(Pokevisit.allUsers, "sync", this.render)
  },

  events: {
    "click h1.change-profile-picture": "uploadPicture",
    "click img.profile-picture-pic": "uploadPicture",
    "click button#create-pikachus": "createPikachu"
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

  createPikachu: function(){
    var width = $("#sprite-container").width()
    var height = $("#sprite-container").height()
    var x = _.random(100, 900);
    var y = _.random(0, 140);
    var pika = new Kinetic.Sprite(this._pikaOptions(x,y))
    this._layer.add(pika)
    pika.start()
    pika.on("click", function(){
      var animations = ["run", "idle", "thundershock", "rolling"]
      var animation = animations[_.random(0, animations.length - 1)]
      pika.animation(animation)
    })
  },

  sprite: function(){
    var width = $("#sprite-container").width()
    var height = $("#sprite-container").height()
    this._stage = new Kinetic.Stage({
      container: "sprite-container",
      width:width,
      height:height,
    })

    this._layer = new Kinetic.Layer();

    this._imageObj = new Image();

    this._imageObj.onload = function() {
      this._pikaOptions = function(x, y){
        return {
          x: x,
          y: y,
          image: this._imageObj,
          animation: 'idle',
          animations: {
            idle: [
            // x, y, width, height (4 frames)
            8, 29, 41, 44,
            49, 29, 34, 42,
            87, 29, 34, 41,
            124, 29, 33, 42,
            ],
            run: [
            6, 161, 51, 32,
            61, 167, 54, 25,
            119, 163, 52, 28,
            178, 166, 51, 24,
            ],

            thundershock: [
            17, 286, 40, 38,
            65, 286, 40, 38,
            116, 276, 33, 56,
            317, 193, 36, 45
            ],

            rolling: [
            12, 420, 30, 44,
            48, 425, 44, 30,
            100, 415, 30, 43,
            134, 423, 43, 30
            ]

          },
          frameRate: 5,
          frameIndex: 0,
          draggable: true,
        }
      }
    }.bind(this);

    this._stage.add(this._layer)

    this._imageObj.src = '/assets/pikachu_big_sprite2.png';
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
      this.$("#create-pikachus").tooltipster();
      this.sprite();
    }.bind(this),0)

    return this;
  }
})
