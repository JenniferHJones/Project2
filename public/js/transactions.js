$(document).ready(function () {

    // Transactions will display in bell notification modal on Market page
    var shortOrderHistory = $(".short-order-history");
    // Transactions will display in orderHistory on Market page
    var orderHistory = $(".order-history");
    // Variable to hold transactions
    var transactions;

    $("#notification-click").on("click", function (event) {

        shortOrderHistory.empty();

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
                initializeRowsShort();
            });
        };

        // Function to append constructed HTML to notification header on Market page
        function initializeRowsShort() {
            var transactionsToAddShort = [];
            for (var i = 0; i < transactions.length; i++) {
                transactionsToAddShort.push(createNewRowShort(transactions[i]));
            }
            shortOrderHistory.append(transactionsToAddShort);
        };

        // Function to construct HTML
        function createNewRowShort(transactions) {
            var formattedDate = new Date(transactions.createdAt);
            formattedDate = moment(formattedDate).format("MM/DD/YYYY");
            var newShortOrderHistoryRow = $("<tr>");
            newShortOrderHistoryRow.append($("<td>" + transactions.action + " " + transactions.symbol + "</td>"));
            newShortOrderHistoryRow.append($("<td>" + formattedDate + "</td>"));
            newShortOrderHistoryRow.append($("<td>" + "Complete" + "</td>"));

            return newShortOrderHistoryRow;
        };
    });

    $("#orderHistory-click").on("click", function (event) {

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
            formattedDate = moment(formattedDate).format("MM/DD/YYYY");
            var totalCost = transactions.price * transactions.quantity;
            var formattedTotalCost = totalCost.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

            var newOrderHistoryRow = $("<tr>");
            newOrderHistoryRow.append($("<td>" + formattedDate + "</td>"));
            newOrderHistoryRow.append($("<td>" + transactions.action + "</td>"));
            newOrderHistoryRow.append($("<td>" + transactions.symbol + "</td>"));
            newOrderHistoryRow.append($("<td>" + "$" + transactions.price + "</td>"));
            newOrderHistoryRow.append($("<td>" + transactions.quantity + "</td>"));
            newOrderHistoryRow.append($("<td>" + formattedTotalCost + "</td>"));

            return newOrderHistoryRow;
        };
    });

})