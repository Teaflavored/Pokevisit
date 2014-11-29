Pokevisit.Views.ListingRequest = Backbone.CompositeView.extend({
  template: JST["listing/request"],

  events: {
    "click button.book-button": "createReservation"
  },

  attachDate: function(){


  },

  attachSelect: function(){

  },

  createReservation: function(event){
    event.preventDefault();
  },

  render: function(){
    var renderedContent = this.template({
      listing: this.model
    });
    
    this.$el.html(renderedContent);

    setTimeout(function(){
      this.attachDate()
      this.attachSelect()
    }.bind(this), 0)

    return this;
  }
})
