// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

//Display bank account and trading account in Transfer Money dialog.
$("#walletModal").on("show.bs.modal", function (event) {

  var modal = $(this);
  var id ='1';
  id = id.replace(/\s+/g, "");
  console.log("i am here 1***");
  $.get("/api/bankaccount/"+ id ,function(data) {

    console.log("acctno" + data.bankAcctNo);
    $("#id-fromacct").val(data.bankAcctNo);
    console.log("i am here 2***");
    });

    $.get("/api/tfyaccounts/"+ id ,function(data) {

      console.log("acctno" + data.tradeAcct);
      $("#id-toacct").val(data.tradeAcct);
      console.log("i am here 2***");
      });
});

// buy modal
$("#buyModal").on("show.bs.modal", function (event) {

  var modal = $(this);
  var id ='1';

    $.get("/api/tfyaccounts/"+ id ,function(data) {

      console.log("acctno" + data.tradeAcct);
      $("#id-acct").val(data.tradeAcct);
     
      });

      
    $.get("/api/tfyaccounts/"+ id ,function(data) {

      console.log("acctno" + data.tradeAcct);
      $("#id-acct").val(data.tradeAcct);
     
      });
});

//transfer money 
$("#transferBtn").on("click", function (event) {
  event.preventDefault();
    var newTransfer = {
      creditAmount : $("#trans-amount").val().trim(),
      debitAmount : null,
      debitAmount : 0 ,
      transfer_date : $("#trans-date").val().trim(),
      CustomerId : 1
    };
   
    $.post("/api/transfer", newTransfer)
    // On success, run the following code
    .then(function(data) {
      console.log(data);
    });

 });

//  trade-tab

 //Set up account 
$("#setup-acct").on("click", function (event) {
  event.preventDefault();
  var bankName = $("#bank-name1").val().trim();
  console.log(bankName);
    var setUpAcct = {
      bankName : $("#bank-name").val().trim(),
      bankAcctNo : $("#bank-acctnum").val().trim(),
      billingAddress : $("#billing-address").val().trim(),
      zip : $("#zip").val().trim(),
      CustomerId : 1
    };
   
    $.post("/api/setupacct", setUpAcct)
    // On success, run the following code
    .then(function(data) {
      console.log(data);
    });

 });


$("#symbol").on("click", function (event) {

  //get request 
});

$("#order").on("click", function (event) {

  //post request :save data in database
  var orderDetails = {
    transactionType : $("#transactionType").val().trim(),
    symbol : $("#symbol").val().trim(),
    action : $("#options").val().trim(),
    quantity : $("#zip").val().trim(),
    ordertype :
    CustomerId : 1
  };
  $.post("/api/order", orderDetails)
    // On success, run the following code
    .then(function(data) {
      console.log(data);
    });

});

$("#options").on("click", function (event) {

  //post request :save data in database


});


$("#symbol").on("click", function (e) {

  $("#symbol-text").removeClass();
});