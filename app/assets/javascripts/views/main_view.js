Pokevisit.Views.MainView = Backbone.CompositeView.extend({
  template: JST["main/main"],


  initialize: function(options){
    this.mainSelector = "div.main"
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)

    var sidebarView = new Pokevisit.Views.ListingSideBar();
    this.addSubview(this.mainSelector, sidebarView)

    return this;
  }
})
