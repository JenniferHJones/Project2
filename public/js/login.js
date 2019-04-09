$(document).ready(function() {
  
  //======================= SIGN IN FORM ==============================
  // Getting references to our form and inputs
  var loginForm = $(".intro-form");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.submit(function(event) {
    $("#errorMessage").text("")
    event.preventDefault();
    var customerData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!customerData.email || !customerData.password) {
      return;
    }

    // If we have an email and password we run the loginCustomer function and clear the form
    loginCustomer(customerData.email, customerData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginCustomer does a post to the "api/login" route and if successful, redirects to the the market page
  function loginCustomer(email, password) {
    console.log("loginCustomer");
    $.post("/api/login", {
      email: email,
      password: password
    }).done(function(data) {
      localStorage.setItem("currentUser", data.userID);
      console.log("received return", data);
      window.location.replace(data.URL + "?currentUser=" + localStorage.getItem("currentUser"));
      // If there's an error, log the error
    }).fail(function(err) {
      $("#errorMessage").text("Bad email or password; please try again.")
      console.log("login error", err);
    });
  }

  function logoutCustomer() {
    console.log("Logged out!");
    localStorage.setItem("currentUser", "");
    window.location.replace("/");
  }
});