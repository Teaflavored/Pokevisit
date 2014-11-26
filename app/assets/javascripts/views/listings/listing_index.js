Pokevisit.Views.ListingIndex = Backbone.CompositeView.extend({
  template: JST["listings/index"],

  initialize: function(options){
    this.listSelector = "ul.listings";

    this._filterData = {
      // room: function(){
      //
      // },

      location: function(){
        return true;
      }

      // price: function(listing){
      //   if (listing.get("price") > 100 && listing.get("price") < 1000){
      //     return true;
      //   }
      // }
    }

    this.listenTo(this.collection, "add", this.addView);
    this.listenTo(this.collection, "remove", this.removeView);
    this.listenTo(this.collection, "filterResult", this.updateFilter);

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
    this._filterData[filterData.filter] = filterData.data;
    this.collection.updateFilteredCollection(this._filterData);
  },

  addView: function(listing){
    var indexItemView = new Pokevisit.Views.ListingIndexItem({
      model: listing
    })
    this.addSubview(this.listSelector, indexItemView);
  },

  removeView: function(listing){
    for( var i = 0; i < this.subviews(this.listSelector).length; i++){
      if (this.subviews(this.listSelector)[i].model.id === listing.id){
        this.removeSubview(this.listSelector, this.subviews(this.listSelector)[i])
      }
    }
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
})
