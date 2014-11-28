Pokevisit.Views.ListingIndexItem = Backbone.CompositeView.extend({
  template: JST["listings/index_item"],

  tagName: "li",

  className: "listing-item",

  attributes: function(){
    return {
      "data-id": this.model.id
    }
  },

  events: {
    "click": "showListing",
    "mouseenter": "changeMarker",
    "mouseleave": "revertMarker"
  },

  showListing: function(event){
    var listingId = $(event.currentTarget).data("id")
    Backbone.history.navigate("#/listings/" + listingId, { trigger: true })
  },

  initialize: function(options){
    this._markers = options._markers
    this.listenTo(this.model, "sync", this.render)
    this.images = this.model.images()
  },

  changeMarker: function(event){

    _.each(this._markers, function(marker){
      if(marker.listingId === this.model.id){
        marker.setIcon("/assets/marker2.png");
        marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
      }
    }.bind(this))
  },

  revertMarker: function(event){

    _.each(this._markers, function(marker){
      if(marker.listingId === this.model.id){
        marker.setIcon("/assets/marker.png");
        marker.setZIndex(google.maps.Marker.MAX_ZINDEX)
      }
    }.bind(this))
  },

  render: function(){

    var renderedContent = this.template({
      listing: this.model
    })

    this.$el.html(renderedContent)

    //styling every list item, need to convert to carousel

    if(this.images.length > 0){
      this.$("div.listing-item-img").css({
        "background-image": "url(" + this.images.models[0].escape("url") + ")",
      })
    }
    return this;
  }
})
