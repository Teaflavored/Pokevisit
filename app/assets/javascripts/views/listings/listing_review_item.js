Pokevisit.Views.ListingReviewItem = Backbone.CompositeView.extend({
  template: JST["listings/review_item"],

  className: "review-item row",

  initialize: function(){
    //listen to users so we can extract user pictures
    this.listenTo(Pokevisit.allUsers, "sync", this.render)
  },

  render: function(){
    var user = Pokevisit.allUsers.findWhere( { id: this.model.get("user_id") })


    var months = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"]


    var renderedContent = this.template({
      review: this.model,
      months: months,
      user: user
    })

    this.$el.html(renderedContent)

    return this;
  }
})
