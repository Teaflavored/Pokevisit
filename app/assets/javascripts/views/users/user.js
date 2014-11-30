Pokevisit.Views.User = Backbone.CompositeView.extend({
  template: JST["users/user"],

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)

    return this;
  }
})
