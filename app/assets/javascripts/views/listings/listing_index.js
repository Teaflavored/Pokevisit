Pokevisit.Views.ListingIndex = Backbone.CompositeView.extend({
  template: JST["listings/index"],

  className: "listings-index",
  
  initialize: function(options){
    this.listSelector = "ul.listings";
    //sets default filter data
    this.setDefaultFilterData();
    //current date used for date filtering
    this._currentDate = new Date();

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

  setDefaultFilterData: function(){
    this._filterData = {

      location: function(){
        return false;
      },

      checkin: function(listing){
        if (listing.get("date_avail") < this._currentDate){
          //if date available is before current date, don't show it
          return false;
        } else {
          return true;
        }
      },

      checkout: function(listing){
        //always true for checkout
        return true;
      },

      price: function(listing){
        if (listing.get("price") >= 0 && listing.get("price") <= 1000){
          return true;
        } else {
          return false;
        }
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
