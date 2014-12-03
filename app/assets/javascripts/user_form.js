$(function(){
  var $form_modal = $('.cd-user-modal');
  var $form_login = $form_modal.find('#cd-login');
  var $form_signup = $form_modal.find('#cd-signup');
  var $signInButton = $form_modal.find("#main-modal-login")
  var $guestButton = $form_modal.find("#main-modal-guest-login")

  $guestButton.on("click", function(event){
    event.preventDefault();

    var string = "pikachu@pokemon.io";
    var pwstring = "password"
    var index = 0;
    var pwindex = 0;

    var printChar = function(str, pwstr){

      if (index > str.length && pwindex > pwstring.length){
        $("#main-modal-login").click();
        return
      }
      setTimeout(function(){
        $("#signin-email").val(str.slice(0, index))
        $("#signin-password").val(pwstr.slice(0, pwindex))
        index++
        pwindex++
        printChar(str, pwstr)
      },25)
    }
    printChar(string, pwstring)


    // $signInButton.click();
  })


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




  //need to get guest button working
})
