Pokevisit.Views.PriceFilter = Backbone.CompositeView.extend({
  template: JST["filters/price"],

  className: "price-filter filter",

  onRender: function(){

    this.$("input#slider").jRange({
      from: 1,
      to: 100,
      step: 1,
      scale: [1,25,50,75,100],
      format: '%s',
      width: 300,
      showLabels: true,
      isRange : true
    });

  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.onRender();
    return this;
  }
})
