$(document).ready(function () {

  //======================= REGISTER FORM ==============================
  // Getting references to our form and input
  var registerForm = $("form#invite");
  var regNameInput = $("#regName")
  var regEmailInput = $("#regEmail");
  var regPasswordInput = $("#regPassword");

  // When the register button is clicked, validate that name, email, and password are not blank
  registerForm.on("submit", function (event) {
    $("#regErrorMessage").text("")
    event.preventDefault();
    var customerData = {
      name: regNameInput.val().trim(),
      email: regEmailInput.val().trim(),
      password: regPasswordInput.val().trim()
    };

    if (!customerData.name || !customerData.email || !customerData.password) {
      return;
    }
    // If there is a name, email, and password, run the registerCustomer function
    registerCustomer(customerData.name, customerData.email, customerData.password);
    regNameInput.val("");
    regEmailInput.val("");
    regPasswordInput.val("");
  });

  // Does a post to the register route. If successful, redirect to market page
  // Otherwise log any errors
  function registerCustomer(name, email, password) {
    $.post("/api/register", {
      name: name,
      email: email,
      password: password
    }).done(function (data) {
      $("#tab_default_1").removeClass("active");
      $("#tab_default_2").addClass("active");
    }).fail(function(err) {
      $("#regErrorMessage").text("This email already registered. Please sign in.")
      console.log("login error", err);
    });
  }

});