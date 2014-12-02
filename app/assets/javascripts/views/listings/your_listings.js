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

  attachSubview: function (selector, subview) {
    this.$(this.listingItemsSelector).masonry()
    this.$(selector).append(subview.$el).masonry('appended', subview.$el);
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
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
    this.$(this.listingItemsSelector).masonry()
    return this;
  }

})
