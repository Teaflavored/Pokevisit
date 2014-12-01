Pokevisit.Views.ListingNew = Backbone.CompositeView.extend({
  template: JST["listings/new"],

  className:"listing-new",

  events: {
    "click .hometype-btn-group button": "getHomeType",
    "click .roomtype-btn-group button": "getRoomType",
    "change #select-accomodates-option": "updateAccomodates",
    "keyup #new-price": "getPrice",
    "click .create-listing-btn": "createListing",
    "click button#select-pictures": "selectPictures"
  },

  initialize: function(options){
    //once this page is submitted, on success of creation, should link user to show page
    //of the listing he/she just made and let them edit the summary etc which can be show on other
    //pages
    this.setFilepicker();

    this._imageUrls = [];
    this._numImages = 0;

    this._params = Object.create(null);
    this._params["listing"] = {
      "hometype": null,
      "roomtype": null,
      "accomodates": 1,
      "date_avail": null,
      "date_end": null,
      "address": null,
      "price": null
    }
    window.testParams = this._params.listing
  },

  getHomeType: function(event){
    var $clickedButton = $(event.currentTarget);
    $clickedButton.addClass("active")
    $clickedButton.siblings().removeClass("active")
    this._params.listing["hometype"] = $clickedButton.data("home")
    this.convertButton();
  },

  getRoomType: function(event){
    var $clickedButton = $(event.currentTarget);
    $clickedButton.addClass("active")
    $clickedButton.siblings().removeClass("active")
    this._params.listing["roomtype"] = $clickedButton.data("room")
    this.convertButton();
  },

  updateAccomodates: function(event){
    this._params.listing["accomodates"] = parseInt($(event.currentTarget).val());
    this.convertButton();
  },

  getPrice: function(event){
    var $input = $(event.currentTarget)
    this._params.listing["price"] = parseInt($input.val())
    this.convertButton();
  },

  setFilepicker: function(){
    if (filepicker){
      //if loaded set key
      filepicker.setKey("AJXpnUispSeOzkYcpSa8Kz");
    }
  },

  convertButton: function(){
    if (this.paramsCompleted()){
      this.$("button.create-listing-btn").removeClass("disabled")
      this.$("button.create-listing-btn").removeAttr("disabled", "disabled")
    } else {
      this.$("button.create-listing-btn").addClass("disabled")
      this.$("button.create-listing-btn").attr("disabled", "disabled")
    }
  },

  createListing: function(event){
    event.preventDefault();
    if (!this.paramsCompleted()){
      return
    } else {
      //create listing, on success create images, on success of images, redirect to show view

      this.model.set(this._params)
      this.model.save({},{
        success: function(){

          Pokevisit.ownListings.add(this.model)

          var successCB = function(modelId){
            //need to edit to your listings later or add options if it's your listing
            Backbone.history.navigate("#/listings/" + modelId, { trigger: true })
          }

          if (this._imageUrls.length === 0){
            this._imageUrls.push("/assets/test_pic1.jpg")
          }

          this.createImages(this.model.id, this._imageUrls, successCB)
        }.bind(this)
      })
    }
  },

  createImages: function(listingId, urls, successCB){
    var image = new Pokevisit.Models.Image();
    var imageParams = {
      "image": {
        "listing_id": listingId,
        "url": urls.shift()
      }
    }
    image.set(imageParams)
    image.save({},{
      success: function(){
        if (urls.length > 0){
          this.createImages(listingId, urls, successCB)
        } else {
          successCB(listingId)
        }
      }.bind(this)
    })
  },

  paramsCompleted: function(){
    var listingObj = this._params.listing
    for(key in listingObj){
      if (!listingObj[key]){
        return false
      }
    }

    return true;
  },

  attachDatepicker: function(){
    //need to grab date picker logic

    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    var checkin = this.$('#date-avail-new').datepicker({
      onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      this._params.listing["date_avail"] = ev.date
      this.convertButton();

      if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
        this._params.listing["date_end"] = newDate;
        this.convertButton();
      }
      checkin.hide();
      this.$('#date-end-new')[0].focus();
    }.bind(this)).data('datepicker');
    var checkout = this.$('#date-end-new').datepicker({
      onRender: function(date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      checkout.hide();
      //need to trigger for checkout
      this._params.listing["date_end"] = ev.date
      this.convertButton();
    }.bind(this)).data('datepicker');
  },

  attachAutocomplete: function(){
    var input = this.$("#address-search").get(0);
    this._autoComplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(this._autoComplete, "place_changed", function(){
      var location = this._autoComplete.getPlace();
      this._params.listing["address"] = location.formatted_address
      this.convertButton();
    }.bind(this))
  },

  selectPictures: function(){
    filepicker.pickMultiple(
      function(Blobs){
        _.each(Blobs, function(blob){
          this._imageUrls.push(blob.url)
          this.$("div.img-preview").append(blob.url + ", ")
        }.bind(this))
      }.bind(this)
    );
  },

  render: function(){
    this.setFilepicker();
    //make sure filepicker key is set
    var renderedContent = this.template()
    this.$el.html(renderedContent)


    setTimeout(function(){
      this.$("#select-accomodates-option").selectpicker();
      this.attachDatepicker();
      this.attachAutocomplete();
    }.bind(this),0)
    return this;
  }
})
;
