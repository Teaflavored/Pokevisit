Pokevisit.Views.PriceFilter = Backbone.View.extend({
  template: JST["filters/price"],

  className: "price-filter filter",
  
  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    return this;
  }
})
