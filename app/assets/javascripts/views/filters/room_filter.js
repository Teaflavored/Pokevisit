Pokevisit.Views.RoomFilter = Backbone.CompositeView.extend({
  template: JST["filters/room"],

  className: "room-filter filter",

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    return this;
  }
})
