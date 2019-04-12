// Alpha Advantage API stock symbol search by company name
$(document).ready(function () {

  searchForSymbolByCompany();

  function searchForSymbolByCompany() {
    // On click event. Sends company name to the Alpha Advantage API and returns the best match stock symbol.
    $("#searchButtonSymbol").on("click", function (event) {
      event.preventDefault();

      var companyName = document.getElementById("search-term-companyName").value;
      var queryURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + companyName + "&apikey=" + keys.alpha.code;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);

        // Clear table rows
        $("#stockSymbolSearch").find("tr:gt(0)").remove();

        // Add table row with Best Match data.
        for (var i = 0; i < response.bestMatches.length; i++) {
          $('#stockSymbolSearch tr:last')
            .after(`<tr><td>${response.bestMatches[i]["1. symbol"]}</td>
          <td>${response.bestMatches[i]["2. name"]}</td>
          <td>${response.bestMatches[i]["3. type"]}</td>
          <td>${response.bestMatches[i]["4. region"]}</td>
          <td>${response.bestMatches[i]["7. timezone"]}</td>
          <td>${response.bestMatches[i]["8. currency"]}</td>
          <td>${response.bestMatches[i]["9. matchScore"]}</td></tr>`);
        }
      });
    });
  }
})