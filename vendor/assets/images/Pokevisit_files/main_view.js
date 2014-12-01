Pokevisit.Views.MainView = Backbone.CompositeView.extend({
  template: JST["main/main"],


  initialize: function(options){
    this.mainSelector = "div.main"

    var sidebarView = new Pokevisit.Views.ListingSideBar();
    this.addSubview(this.mainSelector, sidebarView)

    var mapView = new Pokevisit.Views.Map();
    this.addSubview(this.mainSelector, mapView)
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    this.attachSubviews();

    return this;
  }
})
;
