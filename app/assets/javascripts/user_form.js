$(function(){
  var $form_modal = $('.cd-user-modal');
  var $form_login = $form_modal.find('#cd-login');
  var $form_signup = $form_modal.find('#cd-signup');
  $form_login.on('submit', function(event){
    event.preventDefault();
    var userParams = $form_login.find("form").serializeJSON();
    $.ajax({
      url: "/session",
      type: "POST",
      dataType: "json",
      data: userParams,
      success: function(){
        window.location = "/main"
      }
    })
  });
  $form_signup.on('submit', function(event){
    event.preventDefault();
    var userParams = $form_signup.find("form").serializeJSON();
    $.ajax({
      url: "/users",
      type: "POST",
      dataType: "json",
      data: userParams,
      success: function(){
        window.location = "/main"
      }
    })
  });
})
