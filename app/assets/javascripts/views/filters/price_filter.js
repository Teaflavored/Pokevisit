Pokevisit.Views.PriceFilter = Backbone.CompositeView.extend({
  template: JST["filters/price"],

  className: "price-filter filter",

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    return this;
  }
})
