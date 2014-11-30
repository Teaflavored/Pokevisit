Pokevisit.Views.YourListingsItem = Backbone.CompositeView.extend({
  template: JST["listings/your_listings_item"],

  className: "your-listing-item",

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
    var renderedContent = this.template({
      listing: this.model,
      image: image
    })
    this.$el.html(renderedContent)

    return this;
  }

})
