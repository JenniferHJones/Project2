$("#transfer-tab").on("click", function(event) {
  // alert("in wallet");
  var id = "1";
  $.get("/api/bankaccount/" + id, function(data) {
    console.log("acctno" + data.bankAcctNo);
    $("#id-fromacct").val(data.bankAcctNo);
    console.log("i am here 2***");
  });

  $.get("/api/tfyaccounts/" + id, function(data) {
    console.log("acctno" + data.tradeAcct);
    $("#id-toacct").val(data.tradeAcct);
    console.log("i am here 2***");
  });
  $("#walletModal").modal("show");
});

//Display bank account and trading account in Transfer Money dialog.
// $("#walletModal").on("show.bs.modal", function(event) {
//   alert("in wallet");
//   var modal = $(this);
//   var id = "1";

//   console.log("i am here 1***");
//   $.get("/api/bankaccount/" + id, function(data) {
//     console.log("acctno" + data.bankAcctNo);
//     $("#id-fromacct").val(data.bankAcctNo);
//     console.log("i am here 2***");
//   });

//   $.get("/api/tfyaccounts/" + id, function(data) {
//     console.log("acctno" + data.tradeAcct);
//     $("#id-toacct").val(data.tradeAcct);
//     console.log("i am here 2***");
//   });
// });

// buy modal
$("#buyModal").on("show.bs.modal", function(event) {
  var modal = $(this);
  var id = "1";

  $.get("/api/tfyaccounts/" + id, function(data) {
    console.log("acctno" + data.tradeAcct);
    $("#id-acct").val(data.tradeAcct);
  });

  $.get("/api/vw_CustomerBalance/" + id, function(data) {
    console.log("balance" + data);
    $("#cash").val(data);
  });
});

//transfer money
$("#transferBtn").on("click", function(event) {
  event.preventDefault();
  var newTransfer = {
    creditAmount: $("#trans-amount")
      .val()
      .trim(),
    debitAmount: 0,
    transfer_date: $("#trans-date")
      .val()
      .trim(),
    CustomerId: 1
  };

  $.post("/api/transfer", newTransfer)
    // On success, run the following code
    .then(function(data) {
      console.log(data);
    });
});
//Seach Stock Symbol
$("#seachSymbol").on("click", function(event) {
  var marker = $("<span />").insertBefore("#currentPrice");
  $("#currentPrice")
    .detach()
    .attr("type", "text")
    .insertAfter(marker);
  marker.remove();
  var symbol = $("#symbol-text")
    .val()
    .trim();
  $.get("/api/seachBySymbol/" + symbol, function(data) {
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

//Set up account

$("#setUpAcctBtn").on("click", function(event) {
  // var textFieldVal = $("#setupAcctModal #bank-acctnum").val().trim()
  // console.log(bankName);
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
    CustomerId: 1
  };

  $.post("/api/setupacct", setUpAcct)
    // On success, run the following code
    .then(function(data) {
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

$("#symbol").on("click", function(event) {
  //get request
});

$("#order").on("click", function(event) {
  // var orderDetails;
  var CustomerId = 1;
  var newTransferAmount = 0;
  var transactionType = $("#opt-trans").text();
  var symbol = $("#symbol-text")
    .val()
    .trim();

  var action = $("#opt").text();
  console.log(action);
  var quantity = $("#quantity")
    .val()
    .trim();
    
   
  var price = $("#currentPrice")
    .val()
    .trim();
    
    if (action === "Sell") {
       quantity = -quantity;
    }
  // if (action === "Buy") {
    var orderDetails = {
      transactionType: transactionType,
      symbol: symbol,
      action: action,
      quantity: quantity,
      price: price,
      // ordertype :"Market Order",
      CustomerId: CustomerId
    };
  // } else if (action === "Sell") {
    
  //     orderDetails = {
  //     transactionType: transactionType,
  //     symbol: symbol,
  //     action: action,
  //     quantity: quantity,
  //     price: price,
  //     // ordertype :"Market Order",
  //     CustomerId: 1
  //   };
  //}
 
 
  //get available quantity from database
  $.get("/api/stockquantity/" + CustomerId, +symbol, function(data) {
    console.log(data);
  });
  // var newTransferAmount = -1 * parseFloat(price) * parseFloat(quantity);
  
  if(action==="Buy"){
      newTransferAmount =  price * quantity;
  }else if (action==="Sell")
  {
    newTransferAmount =  (-1)* price * quantity;
  }
  
  
  console.log("transactionType" + transactionType);
  console.log("action"+ action);
  console.log( "quantity" + quantity);
  console.log("price" +price);
  console.log("newTransferAmount" +newTransferAmount);
  

  var newTransferonOrder = {
    creditAmount: newTransferAmount,
    debitAmount: 0,
    transfer_date: new Date(),
    CustomerId: 1
  };

  $.post("/api/order", orderDetails)
    // On success, run the following code
    .then(function(data) {
      console.log(data);
    });

  $.post("/api/transfer", newTransferonOrder)
    // On success, run the following code
    .then(function(data) {
      console.log(data);
    });
});

$("#options").on("click", function(event) {
  //post request :save data in database
});

$("#symbol").on("click", function(e) {
  $("#symbol-text").removeClass();
});

$("#chartSerach").on("click", function(event) {
  
  var symbol =$("#text-chart").val().trim();
  
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
    data: [
      {
        type: "candlestick",
        //type: "ohlc",
        name: "Stock Price",
        color: "#DD7E86",
        showInLegend: true,
        yValueFormatString: "$##0.00",
        xValueType: "dateTime",
        dataPoints: dps
      }
    ]
  });
if(symbol != ""){
  $.get("/api/stockDailyJSON/" + symbol, parseData);
}
else{
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
