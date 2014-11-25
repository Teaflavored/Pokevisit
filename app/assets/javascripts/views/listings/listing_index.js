Pokevisit.Views.ListingIndex = Backbone.CompositeView.extend({
  template: JST["listings/index"],

  

  initialize: function(options){
    this.listSelector = "ul.listings";
    this.listenTo(this.collection, "add", this.addView);

    this.collection.each(function(listing){
      this.addView(listing);
    }.bind(this))
  },

  addView: function(listing){
    var indexItemView = new Pokevisit.Views.ListingIndexItem({
      model: listing
    })
    this.addSubview(this.listSelector, indexItemView);
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
})
