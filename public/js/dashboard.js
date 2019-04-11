$(document).ready(function () {

    $(".dashboard-click").on("click", function (event) {
        // script to append data to dashboard 
        var createRow = function (data) {



            for (var i = 0; i < data.length; i++) {
                // calculate gains
                var dailyGain = Number(data[i].price - data[i].symbol.close);
                var totalGain = dailyGain.toFixed(2);

                var tableRow = $("<tr>");
                tableRow.append($("<td>" + data[i].symbol.symbol + "</td>"));
                tableRow.append($("<td>" + "$" + data[i].price + "</td>"));
                tableRow.append($("<td class='todayGain'>" + "$" + totalGain + "</td>"));
                tableRow.append($("<td class='totalGain'>" + "$" + totalGain + "</td>"));
                tableRow.append($("<td>" + "$" + data[i].symbol.close + "</td>"));
                tableRow.append($("<td>" + data[i].quantity + "</td>"));

                // change color of gain if - or +
                if (dailyGain >= 0) {
                    $(".todayGain").addClass("green");
                } else if (dailyGain < 0) {
                    $(".todayGain").addClass("red");

                }

                if (dailyGain >= 0) {
                    $(".totalGain").addClass("green");
                } else if (dailyGain < 0) {
                    $(".totalGain").addClass("red");

                }

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