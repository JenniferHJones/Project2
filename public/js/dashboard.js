$(document).ready(function () {

    // script to append data to dashboard 
    var createRow = function (data) {

        // var gainT = "some math";
        // var totalGain = "some math";

        for (var i = 0; i < data.length; i++) {
            var tableRow = $("<tr>");
            tableRow.append($("<td>" + data.symbol + "</td>"));

            // var symbol = $("<td>").text(data.symbol);
            // var price = $("<td>").text(data.price);
            // var gainToday = $("<td>").text(gainT);
            // var gainTotal = $("<td>").text(totalGain);
            // var current = $("<td>").text(data.price);
            // var quantity = $("<td>").text(data.quantity);

            // tableRow.append(symbol, price, current, quantity);
            $("#dashboard-body").append(tableRow);
            return tableRow;
        }
    };

    console.log("Is this being called?");
    // somehow 
    var customerID = localStorage.getItem("currentUser");
    $.ajax({
        url: "/api/market/"+ customerID,
        method: "GET"
    }).then(function (response) {
        createRow(response);
    });
});