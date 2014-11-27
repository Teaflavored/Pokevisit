Pokevisit.Views.RoomFilter = Backbone.CompositeView.extend({
  template: JST["filters/room"],

  className: "room-filter filter",

  listenToCheckBox: function(){
    this.$("input").labelauty({
      checked_label: "Unselect",
      unchecked_label: "Select"
    });
    this.$("input").on("change", function(event){
      var roomTypes = this.$("input:checked").map(function(){
        return $(this).val();
      }).get();

      //filter trigger
      Pokevisit.filteredListings.trigger("filterResult", {
        "filter": "roomtype",
        data: function(listing){
          if (roomTypes.length === 0){
            //no filters if length is 0
            return true;
          }
          if ( _.contains(roomTypes, listing.escape("roomtype"))){
            return true;
          } else {
            return false;
          }
        }
      })
    }.bind(this))
  },


  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    setTimeout(function(){
      this.listenToCheckBox();
    }.bind(this), 0)
    return this;
  }
})
