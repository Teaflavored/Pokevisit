(function() { this.JST || (this.JST = {}); this.JST["listings/summary"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<img class="listing-show-img" src=\'',  user ? user.get("image_url") : "/assets/user_image_placeholder.jpg" ,'\'>\n<h3 class="user-email">',  user ? user.get("email") : "placeholder@placeholder.com" ,'</h3>\n\n<div class="date-avail-label">Date Available</div>\n');  var dateIn = new Date(listing.get("date_avail")) ; __p.push('\n');  dateIn.setDate(dateIn.getDate() + 1) ; __p.push('\n\n<div class="date-avail">\n  <time class="icon">\n    <em>',  weekDay[dateIn.getDay()] ,'</em>\n    <strong>',  months[dateIn.getMonth()],'</strong>\n    <span>',  dateIn.getDate() ,'</span>\n  </time>\n</div>\n\n<div class="date-end-label">Date End</div>\n');  var dateOut = new Date(listing.get("date_end")) ; __p.push('\n');  dateOut.setDate(dateOut.getDate() + 1) ; __p.push('\n\n<div class="date-end">\n  <time  class="icon">\n    <em>',  weekDay[dateOut.getDay()] ,'</em>\n    <strong>',  months[dateOut.getMonth()],'</strong>\n    <span>',  dateOut.getDate() ,'</span>\n  </time>\n</div>\n\n\n<div class="address-label">Address:</div>\n<div class="summary-location">',  listing.escape("address") ,'</div>\n');}return __p.join('');};
}).call(this);
