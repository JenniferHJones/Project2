$(document).ready(function () {

    $(".dashboard-click").on("click", function (event) {
        // script to append data to dashboard 
        var createRow = function (data) {

            $("#dashboard-body").empty();
            $(".todayGain").removeClass("red");
            $(".todayGain").removeClass("green");
            $(".totalGain").removeClass("red");
            $(".totalGain").removeClass("green");
            for (var i = 0; i < data.length; i++) {

                //Mallika--added logic for dashboard
                //Last Price : last market price
                var priceDelta = (Math.random() * parseFloat(data[i].symbol.close)) / 100;
                var lastPrice = (parseFloat(data[i].symbol.close) + parseFloat(priceDelta)).toFixed(2);
                //Ends Here
                // calculate gains
                // var dailyGain = Number(data[i].price - data[i].symbol.close);
                var dailyGain = Number(lastPrice - data[i].price);
                var totalGain = dailyGain.toFixed(2);

                var quantity = data[i].quantity;
                var currentValue = lastPrice * quantity; 
                var costBasis = data[i].price * quantity;

                var tableRow = $("<tr>");
                tableRow.append($("<td>" + data[i].symbol.symbol + "</td>"));
                tableRow.append($("<td>" + "$" + lastPrice + "</td>"));
                // tableRow.append($("<td>" + "$" + data[i].price + "</td>"));
               var className1 = "todayGain" + i ;
               var className2 = "totalGain" + i ;
             
                tableRow.append($("<td class=className1>" + "$" + totalGain + "</td>"));
                tableRow.append($("<td class=className2>" + "$" + totalGain + "</td>"));
                tableRow.append($("<td>" + "$" + currentValue + "</td>"));
                tableRow.append($("<td>" + data[i].quantity + "</td>"));
                tableRow.append($("<td>" + costBasis + "</td>"));

                // change color of gain if - or +
                if (dailyGain >= 0) {
                    //  $(".className1").addClass("green");
                    $(".className1").css("color" , "blue");
                } else if (dailyGain < 0) {
                    $(".className1").css("color" , "red");
                    // $(".className1").addClass("green");

                }

                if (dailyGain >= 0) {
                    // $(".i").addClass("green");
                    $(".className2").css("color" , "blue");
                } else if (dailyGain < 0) {
                    // $(".totalGain").addClass("red");
                    $(".className2").css("color" , "red");

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
        });

    })
});