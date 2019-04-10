var CustomerId = localStorage.getItem("currentUser");
$(".user-block-name").text(CustomerId);

$.get("/api/tfyaccounts/" + CustomerId, function (data) {
  console.log("acctno" + data.fName);
  $(".user-block-name").text( data.fName);
  console.log("i am here 2***");
});

//Set up account
$("#setUpAcctBtn").on("click", function (event) {

  var setUpAcct = {
    bankName: $("#bank-name")
      .val()
      .trim(),
    bankAcctNo: $("#bank-acctnum")
      .val()
      .trim(),
    billingAddress: $("#billing-address")
      .val()
      .trim(),
    zip: $("#zip")
      .val()
      .trim(),
    CustomerId: CustomerId
  };

  $.post("/api/setupacct", setUpAcct)
    // On success, run the following code
    .then(function (data) {
      console.log(data);
      $(".lead").text("Your account set up successfully!");
      $("#alertModal").modal("show");
      $("#bank-name").val("");
      $("#bank-acctnum").val("");
      $("#billing-address").val("");
      $("#zip").val();
      $("#setupAcctModal").modal("hide");
    });
});

$("#transfer-tab").on("click", function (event) {

  $.get("/api/bankaccount/" + CustomerId, function (data) {
    console.log("acctno" + data.bankAcctNo);
    $("#id-fromacct").val(data.bankAcctNo);
    console.log("i am here 2***");
  });

  $.get("/api/tfyaccounts/" + CustomerId, function (data) {
    console.log("acctno" + data.tradeAcct);
    $("#id-toacct").val(data.tradeAcct);
    console.log("i am here 2***");
  });
  $("#walletModal").modal("show");
});

// buy modal
$("#buyModal").on("show.bs.modal", function (event) {
  var modal = $(this);
  $.get("/api/tfyaccounts/" + CustomerId, function (data) {
    console.log("acctno" + data.tradeAcct);
    $("#id-acct").val(data.tradeAcct);
  });

  $.get("/api/vw_CustomerBalance/" + CustomerId, function (data) {
    console.log("balance" + data);
    $("#cash").val(data);
  });
});

//transfer money
$("#transferBtn").on("click", function (event) {
  event.preventDefault();
  var newTransfer = {
    creditAmount: $("#trans-amount")
      .val()
      .trim(),
    debitAmount: 0,
    transfer_date: $("#trans-date")
      .val()
      .trim(),
    CustomerId: CustomerId
  };

  $.post("/api/transfer", newTransfer)
    // On success, run the following code
    .then(function (data) {
      console.log(data);
      $(".lead").text("Transfer successfull!");
      $("#alertModal").modal("show");
      $("#trans-date").val("");
      $("#trans-amount").val("");
      $("#setupAcctModal").modal("hide");
    });
});
//Seach Stock Symbol
$("#seachSymbol").on("click", function (event) {
  var marker = $("<span />").insertBefore("#currentPrice");
  $("#currentPrice")
    .detach()
    .attr("type", "text")
    .insertAfter(marker);
  marker.remove();
  var symbol = $("#symbol-text")
    .val()
    .trim();
  $.get("/api/seachBySymbol/" + symbol, function (data) {
    var priceDelta = (Math.random() * parseFloat(data.close)) / 100;
    newClosePrice = (parseFloat(data.close) + parseFloat(priceDelta)).toFixed(
      2
    );
    var priceSpread = (
      (parseFloat(newClosePrice) * Math.random()) /
      500
    ).toFixed(2);

    // console.log("Close: " + data.close);
    // console.log("PriceDelta: " + priceDelta);
    // console.log("NewClosePrice: " + newClosePrice);
    $("#currentPrice").val(newClosePrice); //Current Price

    // console.log("Spread" + priceSpread);
  });
});


$("#symbol").on("click", function (event) {
  //get request
});

$("#order").on("click", function (event) {
  // var orderDetails;

  var newTransferAmount = 0;
  var orderDetails;
  var transactionType = $("#opt-trans").text().trim();
  var symbol = $("#symbol-text").val().trim();

  var action = $("#opt").text().trim();
  var quantity = $("#quantity").val().trim();
  var price = $("#currentPrice").val().trim();

 
  if (action === "Buy"){
    placeOrderUpdateDb(transactionType,symbol,action,quantity, price);
  }else if (action === "Sell") {
    //Check customer input quantity is valid for sell
    try {
      $.get("/api/stockquantity/" + CustomerId + "/" + symbol, function (data) {
        console.log("quantity from database**" + data);
        if (quantity > data) {
          $(".qnt-err-text").text("Available stock quantity for sell : " +  data);
          throw "Please enter a valid quantity!";
          // alert("Available stock quantity for sell" + data);
        } else {
          placeOrderUpdateDb(transactionType,symbol,action,quantity, price);
        }

      });
    } catch (error) {
      console.error(error);
     
    }
  }
 
});

function  placeOrderUpdateDb(transactionType,symbol,action,quantity, price){

  if (action === "Buy") {
    orderDetails = {
      transactionType: transactionType,
      symbol: symbol,
      action: action,
      quantity: quantity,
      price: price,
      // ordertype :"Market Order",
      CustomerId: CustomerId
    };
    newTransferAmount = -1 * parseFloat(price) * parseFloat(quantity);;
  } else if (action === "Sell") {
    orderDetails = {
      transactionType: transactionType,
      symbol: symbol,
      action: action,
      quantity: -1 * quantity,
      price: price,
      // ordertype :"Market Order",
      CustomerId: CustomerId
    };
    newTransferAmount = parseFloat(price) * parseFloat(quantity);
  }

  var newTransferonOrder = {
    creditAmount: newTransferAmount,
    debitAmount: 0,
    transfer_date: new Date(),
    CustomerId: CustomerId
  };

  $.post("/api/order", orderDetails)
  // On success, run the following code
  .then(function (data) {
    console.log(data);
    //once order process successfully then update the transfer table with the amount
    $.post("/api/transfer", newTransferonOrder)
      // On success, run the following code
      .then(function (data) {
        console.log(data);
        $(".lead").text("Your order has been processed!");
        $("#alertModal").modal("show");
        $("#opt-trans").text("Select");
        $("action").text("Select");
        $("orderType").text("Select");
        $("#symbol-text").val("");
        $("#currentPrice").val("");
        $("#quantity").val("");
        $(".qnt-err-text").val("");
        $("#buyModal").modal("hide");
      });
  });
}



$("#options").on("click", function (event) {
  //post request :save data in database
});

$("#symbol").on("click", function (e) {
  $("#symbol-text").removeClass();
});

$("#chartSerach").on("click", function (event) {

  var symbol = $("#text-chart").val().trim();

  var dps = [];
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light3", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    title: {
      // text: "Stock Price "
    },
    axisX: {
      valueFormatString: "DD MMM"
    },
    axisY: {
      title: "Price",
      includeZero: false,
      prefix: "$"
    },
    data: [{
      type: "candlestick",
      //type: "ohlc",
      name: "Stock Price",
      color: "#DD7E86",
      showInLegend: true,
      yValueFormatString: "$##0.00",
      xValueType: "dateTime",
      dataPoints: dps
    }]
  });
  if (symbol != "") {
    $.get("/api/stockDailyJSON/" + symbol, parseData);
  } else {
    $.get("/api/stockDailyJSON/" + AMZN, parseData);
  }

  function parseData(result) {
    for (var i = 0; i < 100; i++) {
      dps.push({
        x: result[i].x,
        y: result[i].y
      });
    }
    chart.render();
    console.log(dps);
  }
});