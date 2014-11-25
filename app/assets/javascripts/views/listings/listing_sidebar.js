Pokevisit.Views.ListingSideBar = Backbone.CompositeView.extend({
  template: JST["listings/sidebar"],

  initialize: function(options){
    this.sidebarSelector = "div.sidebar"

    var dateFilterView = new Pokevisit.Views.DateFilter();
    this.addSubview(this.sidebarSelector, dateFilterView);

    var roomFilterView = new Pokevisit.Views.RoomFilter();
    this.addSubview(this.sidebarSelector, roomFilterView);

    var priceFilterView = new Pokevisit.Views.PriceFilter();
    this.addSubview(this.sidebarSelector, priceFilterView);

    var indexView = new Pokevisit.Views.ListingIndex({
      collection: Pokevisit.listings
    })
    this.addSubview(this.sidebarSelector, indexView);
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    Pokevisit.listings.fetch();
    return this;
  }
})
