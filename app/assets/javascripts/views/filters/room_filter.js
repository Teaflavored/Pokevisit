Pokevisit.Views.RoomFilter = Backbone.View.extend({
  template: JST["filters/room"],

  className: "room-filter filter",
  
  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent)

    return this;
  }
})
