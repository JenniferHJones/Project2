// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

var   newClosePrice =0;

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

      
    $.get("/api/vw_CustomerBalance/"+ id ,function(data) {

      console.log("balance" + data);
      $("#cash").val(data);
     
      });
});

//transfer money 
$("#transferBtn").on("click", function (event) {
  event.preventDefault();
    var newTransfer = {
      creditAmount : $("#trans-amount").val().trim(),
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
//Seach Stock Symbol 
 $("#seachSymbol").on("click", function (event) {
  var symbol = $("#symbol-text").val().trim()
  $.get("/api/seachBySymbol/"+ symbol ,function(data) {
    var priceDelta =  Math.random()*parseFloat(data.close)/100;
     newClosePrice =  (parseFloat(data.close) + parseFloat(priceDelta)).toFixed(2);
    var priceSpread = (parseFloat(newClosePrice)*Math.random()/500).toFixed(2);
   
    console.log("Close: " + data.close);
    console.log("PriceDelta: " + priceDelta);
    console.log("NewClosePrice: " + newClosePrice);
    $("#currentPrice").val(newClosePrice); //Current Price
   // $("#currentPrice").val(data.close); // Close price from DB 
    //Math.round(var)
    console.log("Spread" + priceSpread);
   // $("#currentPrice").val( (parseFloat(data.close) + priceSpread); //Bid
   // $("#currentPrice").val( (parseFloat(data.close) - priceSpread); //Ask
    });

 });


//  trade-tab

 //Set up account 
//  var bankName = $("#bank-name").val().trim();
$("#setUpAcctBtn").on("click", function (event) {
 
  // var textFieldVal = $("#setupAcctModal #bank-acctnum").val().trim()
  // console.log(bankName);
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

   var action = $("#opt").text(); 
  
  //  $('#dropDownId :selected').text();
  //  alert(transactionType);
  //post request :save data in database
  if(action === "buy"){
    var orderDetails = {
      transactionType : $("#opt-trans").text(),
      symbol : $("#symbol").val().trim(),
      // transactionType : "Stock",
      // symbol : $("#symbol").val().trim(),
      // symbol : 'AMZN', 
      action : $("#options").val().trim(), 
      quantity : $("#quantity").val().trim(),
      price :   newClosePrice,
      // ordertype :"Market Order",
      CustomerId : 1
    };
  }
  else if(action === "sell"){
    var orderDetails = {
      // transactionType : $("#transactionType").val().trim(),
      // symbol : $("#symbol").val().trim(),
      transactionType : "Stock",
      // symbol : $("#symbol").val().trim(),
      symbol : 'AMZN',
      action : "sell",
      quantity : -10,
      price :   newClosePrice,
      // ordertype :"Market Order",
      CustomerId : 1
    };
  }
  var newTransferAmount = -1*parseFloat(orderDetails.price)*parseFloat(orderDetails.quantity);
    var newTransferonOrder = {
    creditAmount : newTransferAmount,
    debitAmount : 0 ,
    transfer_date : new Date(),
    CustomerId : orderDetails.CustomerId
  };

  $.post("/api/order", orderDetails)
    // On success, run the following code
    .then(function(data) {
      console.log(data);
    });
  $.post("/api/transfer",  newTransferonOrder)
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

// var chart = new CanvasJS.Chart("chartContainer", {
// 	animationEnabled: true,
// 	theme: "light2", // "light1", "light2", "dark1", "dark2"
// 	exportEnabled: true,
// 	title:{
// 		text: "Stock Price: AT&T Vs Verizon for 2016"
// 	},
// 	axisX: {
// 		valueFormatString: "MMM"
// 	},
// 	axisY: {
// 		includeZero:false, 
// 		prefix: "$",
// 		title: "Price (in USD)"
// 	},
// 	toolTip: {
// 		shared: true
// 	},
// 	legend: {
// 		cursor: "pointer",
// 		itemclick: toogleDataSeries
// 	},
// 	data: [{
// 		type: "candlestick",
// 		showInLegend: true,
// 		name: "AT&T",
// 		yValueFormatString: "$###0.00",
// 		xValueFormatString: "MMMM YY",
// 		dataPoints: [
// 			{ x: new Date(2016, 00, 01), y: [34.080002, 36.060001, 33.410000, 36.060001] },
// 			{ x: new Date(2016, 01, 01), y: [36.040001, 37.500000, 35.790001, 36.950001] },
// 			{ x: new Date(2016, 02, 01), y: [37.099998, 39.720001, 37.060001, 39.169998] },
// 			{ x: new Date(2016, 03, 01), y: [38.669998, 39.360001, 37.730000, 38.820000] },
// 			{ x: new Date(2016, 04, 01), y: [38.869999, 39.669998, 37.770000, 39.150002] },
// 			{ x: new Date(2016, 05, 01), y: [39.099998, 43.419998, 38.580002, 43.209999] },
// 			{ x: new Date(2016, 06, 01), y: [43.209999, 43.889999, 41.700001, 43.290001] },
// 			{ x: new Date(2016, 07, 01), y: [43.250000, 43.500000, 40.549999, 40.880001] },
// 			{ x: new Date(2016, 08, 01), y: [40.849998, 41.700001, 39.549999, 40.610001] },
// 			{ x: new Date(2016, 09, 01), y: [40.619999, 41.040001, 36.270000, 36.790001] },
// 			{ x: new Date(2016, 10, 01), y: [36.970001, 39.669998, 36.099998, 38.630001] },
// 			{ x: new Date(2016, 11, 01), y: [38.630001, 42.840000, 38.160000, 40.380001] }
// 		]
// 	},
// 	{
// 		type: "candlestick",
// 		showInLegend: true,
// 		name: "Verizon",
// 		yValueFormatString: "$###0.00",
// 		dataPoints: [
// 			{ x: new Date(2016, 00, 01), y: [45.669998, 49.990002, 43.790001, 49.970001] },
// 			{ x: new Date(2016, 01, 01), y: [49.939999, 51.380001, 49.270000, 50.730000] },
// 			{ x: new Date(2016, 02, 01), y: [50.990002, 54.369999, 50.980000, 54.080002] },
// 			{ x: new Date(2016, 03, 01), y: [53.320000, 54.490002, 49.470001, 50.939999] },
// 			{ x: new Date(2016, 04, 01), y: [51.220001, 51.700001, 49.049999, 50.900002] },
// 			{ x: new Date(2016, 05, 01), y: [50.869999, 55.919998, 50.119999, 55.840000] },
// 			{ x: new Date(2016, 06, 01), y: [55.849998, 56.950001, 54.439999, 55.410000] },
// 			{ x: new Date(2016, 07, 01), y: [55.580002, 55.820000, 51.900002, 52.330002] },
// 			{ x: new Date(2016, 08, 01), y: [52.139999, 53.880001, 51.020000, 51.980000] },
// 			{ x: new Date(2016, 09, 01), y: [51.840000, 52.139999, 47.580002, 48.099998] },
// 			{ x: new Date(2016, 10, 01), y: [48.320000, 51.200001, 46.009998, 49.900002] },
// 			{ x: new Date(2016, 11, 01), y: [49.799999, 53.900002, 49.310001, 53.380001] }
// 		]
// 	}]
// });
// chart.render();

// function toogleDataSeries(e) {
// 	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
// 		e.dataSeries.visible = false;
// 	} else {
// 		e.dataSeries.visible = true;
// 	}
// 	e.chart.render();
// }

var dps = [];
var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light3", // "light1", "light2", "dark1", "dark2"
	exportEnabled: true,
	title: {
		text: "Intel Stock Price - January 2017"
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
		name: "Intel Stock Price",
		color: "#DD7E86",
		showInLegend: true,
		yValueFormatString: "$##0.00",
		xValueType: "dateTime",
		dataPoints: dps
	}]
});
//$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=full&apikey=M9IF2RS90K9M6VCE", parseData);
$.get("/api/stockDailyJSON/"+ "AMZN" ,parseData)

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
