Pokevisit.Views.YourListingsItem = Backbone.CompositeView.extend({
  template: JST["listings/your_listings_item"],

  className: function(){
    var classString = "your-listing-item "
    var randomN = Math.random();
    if (randomN < 0.4) {
      classString += "item"
    } else if (randomN < 0.8){
      classString += "itemw2"
    } else {
      classString += "itemw3"
    }
    return classString
  },

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click button.edit-listing": "showListing",
    "click button.show-reservations": "showListingReservations"
  },

  showListing: function(event){
    event.preventDefault();
    Backbone.history.navigate("#/listings/" + this.model.id, { trigger: true })
  },

  showListingReservations: function(event){
    event.preventDefault();
    Backbone.history.navigate("#/listings/" + this.model.id + "/reservations", { trigger: true })
  },

  render: function(){
    var image = this.model.images().models[0]
    if (!image){
      this.model.fetch()
    }
    var renderedContent = this.template({
      listing: this.model,
      image: image
    })
    this.$el.html(renderedContent)
    this.$(".flipbook").flip({
      axis: 'x',
      trigger: 'hover'
    })

    setTimeout(function(){
      $("div.flip").css("width", "100%")
      $("div.flip").css("height", "100%")

      $("#listing-container").imagesLoaded( function(){
        $("#listing-container").masonry({
          columnWidth: 0,
          itemSelector: '.item'
        });
      })

    }, 0)
    return this;
  }

})
