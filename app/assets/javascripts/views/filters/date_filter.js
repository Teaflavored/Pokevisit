Pokevisit.Views.DateFilter = Backbone.CompositeView.extend({
  template: JST["filters/date"],

  className: "date-filter filter",

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    return this;
  }
})
