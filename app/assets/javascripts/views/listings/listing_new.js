Pokevisit.Views.ListingNew = Backbone.CompositeView.extend({
  template: JST["listings/new"],

  className:"listing-new",

  initialize: function(options){
    //once this page is submitted, on success of creation, should link user to show page
    //of the listing he/she just made and let them edit the summary etc which can be show on other
    //pages
    this.setFilepicker();
  },



  setFilepicker: function(){
    if (filepicker){
      //if loaded set key
      filepicker.setKey("AJXpnUispSeOzkYcpSa8Kz");
    }
  },

  render: function(){
    this.setFilepicker();
    //make sure filepicker key is set
    var renderedContent = this.template()
    this.$el.html(renderedContent)

    return this;
  }
})
