$(document).ready(function () {

    // Transactions will display in orderHistory on Market page
    var orderHistory = $(".order-history");
    // Variable to hold transactions
    var transactions;

    // Determines ID of logged in customer
    var url = window.location.search;
    var customerID;
    if (url.indexOf("?currentUser=") !== -1) {
        customerID = url.split("=")[1];
        getTransactions(customerID);
    };

    // Function to grab transactions from database to display on page
    function getTransactions(customer) {
        customerID = "?currentUser=" + customerID;

        $.get("/api/transactions" + customerID, function (data) {
            transactions = data;
            initializeRows();
        });
    };

    // Function to append constructed HTML to orderHistory on Market page
    function initializeRows() {
        orderHistory.empty();
        var transactionsToAdd = [];
        for (var i = 0; i < transactions.length; i++) {
            transactionsToAdd.push(createNewRow(transactions[i]));
        }
        orderHistory.append(transactionsToAdd);
    };

    // Function to construct HTML
    function createNewRow(transactions) {
        var formattedDate = new Date(transactions.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do, YYYY");

        var totalCost = transactions.price * transactions.quantity;
        var formattedTotalCost = totalCost.toLocaleString(undefined, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});

        var newRow = $("<tr>");
        newRow.append($("<td>" + formattedDate + "</td>"));
        newRow.append($("<td>" + transactions.action + "</td>"));
        newRow.append($("<td>" + transactions.symbol + "</td>"));
        newRow.append($("<td>" + transactions.price + "</td>"));
        newRow.append($("<td>" + transactions.quantity + "</td>"));
        newRow.append($("<td>" + formattedTotalCost + "</td>"));
        // newRow.append($("<td>" + "" + "</td>"));

        return newRow;
    };
})