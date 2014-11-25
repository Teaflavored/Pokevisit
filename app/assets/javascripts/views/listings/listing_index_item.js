Pokevisit.Views.ListingIndexItem = Backbone.CompositeView.extend({
  template: JST["listings/index_item"],

  tagName: "li",
  className: "listing-item",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
    this.images = this.model.images()
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    })
    this.$el.html(renderedContent)

    //styling every list item, need to conver to carousel
  
    if(this.images.length > 0){
      this.$el.css({
        "background-image": "url(" + this.images.models[0].escape("url") + ")",
        "background-size": "250px 250px",
        "height": "250px"
      })
    }
    return this;
  }
})
