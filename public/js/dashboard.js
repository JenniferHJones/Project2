$(document).ready(function () {

    $(".dashboard-click").on("click", function (event) {
        // script to append data to dashboard 
        var createRow = function (data) {

            // var gainT = "some math";
            // var totalGain = "some math";

            for (var i = 0; i < data.length; i++) {
                var tableRow = $("<tr>");
                tableRow.append($("<td>" + data[i].symbol + "</td>"));
                tableRow.append($("<td>" + "$" + data[i].price + "</td>"));
                tableRow.append($("<td>" + "something" + "</td>"));
                tableRow.append($("<td>" + "something" + "</td>"));
                tableRow.append($("<td>" + "$" + data[i].symbol.close + "</td>"));
                tableRow.append($("<td>" + data[i].quantity + "</td>"));

                $("#dashboard-body").append(tableRow);
            }
        };

        var customerID = localStorage.getItem("currentUser");
        $.ajax({
            url: "/api/market/" + customerID,
            method: "GET"
        }).then(function (response) {
            createRow(response);

            // make another ajax request get with symbol

            // update the existing table
        });

    })
});