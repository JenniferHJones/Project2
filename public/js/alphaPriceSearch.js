// Alpha Advantage API searches for the company stock pricing data by symbol
$(document).ready(function () {
  searchPriceBySymbol();

  function searchPriceBySymbol() {

    $("#searchButtonSymbol").on("click", function (event) {
      event.preventDefault();

      var symbol = document.getElementById("search-term-symbol").value;
      var queryURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + keys.alpha.code;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        // Clear table rows
        $("#RealTimeStockPricing").find("tr:gt(0)").remove();
        // Add table row with price data.
        $('#RealTimeStockPricing tr:last')
          .after(`<tr><td>${response["Global Quote"]["01. symbol"]}</td>
          <td>${response["Global Quote"]["02. open"]}</td>
          <td>${response["Global Quote"]["03. high"]}</td>
          <td>${response["Global Quote"]["04. low"]}</td>
          <td>${response["Global Quote"]["05. price"]}</td>
          <td>${response["Global Quote"]["06. volume"]}</td>
          <td>${response["Global Quote"]["07. latest trading day"]}</td></tr>`);

      });
    });
  }
})