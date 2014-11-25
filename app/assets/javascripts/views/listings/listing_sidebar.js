Pokevisit.Views.ListingSideBar = Backbone.CompositeView.extend({
  template: JST["listings/sidebar"],

  initialize: function(options){
    this.sidebarSelector = "div.sidebar"
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    var indexView = new Pokevisit.Views.ListingIndex({
      collection: Pokevisit.listings
    })

    this.addSubview(this.sidebarSelector, indexView)

    Pokevisit.listings.fetch();
    return this;
  }
})