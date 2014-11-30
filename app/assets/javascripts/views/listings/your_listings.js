Pokevisit.Views.YourListings = Backbone.CompositeView.extend({
  template: JST["listings/your_listings"],

  initialize: function(options){
    this.listingItemsSelector = "div.your-listings"
    this.listenTo(this.collection, "add", this.addView)
    this.listenTo(this.collection, "remove", this.removeView)

    this.collection.each(function(listing){
      this.addView(listing)
    }.bind(this))
  },

  addView: function(listing){
    var listingItemView = new Pokevisit.Views.YourListingsItem({
      model: listing
    })
    this.addSubview(this.listingItemsSelector, listingItemView)
  },

  removeView: function(listing){
    _.each(this.subviews(this.listingItemsSelector), function(view){
      if (view.model.id === listing.id){
        this.removeSubview(view)
      }
    }.bind(this))
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }

})
