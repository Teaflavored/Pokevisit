Pokevisit.Views.ListingIndex = Backbone.CompositeView.extend({
  template: JST["listings/index"],

  initialize: function(options){
    this.listSelector = "ul.listings";

    this._filterData = {
      // room: function(){
      //
      // },

      location: function(listing){
        if (listing.get("lat") >= 37.728528974525844
            && listing.get("lat") <= 37.725261931200215
            && listing.get("lng") >= -122.39876950293274
            && listing.get("lng") <= -122.39273989706726){
              return true;
            }

          return false;
      },

      // price: function(listing){
      //   if (listing.get("price") > 100 && listing.get("price") < 1000){
      //     return true;
      //   }
      // }
    }

    this.listenTo(this.collection, "add", this.addView);
    this.listenTo(this.collection, "remove", this.removeView);
    this.listenTo(this.collection, "filter", this.updateFilter)
    Pokevisit.listings.fetch({
      success: function(){
        this.collection.updateFilteredCollection(this._filterData);
      }.bind(this)
    });


    this.collection.each(function(listing){
      this.addView(listing);
    }.bind(this))
  },

  updateFilter: function(filterData){
    this[filterData.filter] = filterData.data;
    this.collection.updateFilteredCollection(this._filterData);
  },

  addView: function(listing){
    var indexItemView = new Pokevisit.Views.ListingIndexItem({
      model: listing
    })
    this.addSubview(this.listSelector, indexItemView);
  },

  removeView: function(listing){
    _.each(this.subviews(this.listSelector), function(view){
      //delete the subview
    })
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
})
