Pokevisit.Views.ListingSummary = Backbone.CompositeView.extend({
  template: JST["listings/summary"],

  className: "listing-summary",

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
})
