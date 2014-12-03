$(function(){
  var $form_modal = $('.cd-user-modal');
  var $form_login = $form_modal.find('#cd-login');
  var $form_signup = $form_modal.find('#cd-signup');

  $form_login.on('submit', function(event){
    event.preventDefault();
    var queryString = $("#main-modal-login").data("query")
    var userParams = $form_login.find("form").serializeJSON();
    $.ajax({
      url: "/session",
      type: "POST",
      dataType: "json",
      data: userParams,
      success: function(){
        if (queryString){
          window.location = "/main" + queryString
        } else {
          window.location = "/main"
        }
      }
    })
  });

  $form_signup.on('submit', function(event){
    event.preventDefault();
    var queryString = $("#main-modal-signup").data("query")
    var userParams = $form_signup.find("form").serializeJSON();
    $.ajax({
      url: "/users",
      type: "POST",
      dataType: "json",
      data: userParams,
      success: function(){
        if (queryString){
          window.location = "/main" + queryString
        } else {
          window.location = "/main"
        }
      }
    })
  });
})
