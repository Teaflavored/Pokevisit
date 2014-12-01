Pokevisit.Views.PriceFilter = Backbone.CompositeView.extend({
  template: JST["filters/price"],

  className: "price-filter filter",

  attachSlider: function(){
    this.$("#slider").noUiSlider({
      start: [ 0, 1000 ],
      step: 1,
      behaviour: 'drag-tap',
      connect: true,
      range: {
        "min":  0,
        "max":  1000
      }
    });

    this.$lowPrice = this.$("#low-slider-price");
    this.$highPrice = this.$("#high-slider-price");

    //update values when sliding
    this.onSlide();
    //trigger filter
    this.slideFilter();
  },

  onSlide: function(){
    this.$("#slider").on("slide", function(){
      var values = this.$("#slider").val();
      this.$lowPrice.html("$ " + parseInt(values[0]));
      this.$highPrice.html("$ " + parseInt(values[1]));
    }.bind(this))
  },

  slideFilter: function(){
    this.$("#slider").on("change", function(){
      var values = this.$("#slider").val();

      Pokevisit.filteredListings.trigger("filterResult", {
        "filter": "price",
        data: function(listing){
          if (listing.get("price") >= parseInt(values[0]) && listing.get("price") <= parseInt(values[1])){
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
    this.$el.html(renderedContent);


    //need to setTimeout so we can correctly initialize slider
    setTimeout(function(){
      this.attachSlider();
    }.bind(this),0)

    return this;
  }
})
;
