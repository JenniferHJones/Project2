// News API Client script

// Calls to functions
topHeadlines();
searchNewsApi();

// This function gets top three headline news stories from the News API and displays them in the market.html file 
function topHeadlines() {
    $.ajax({ url: "/api/newsData", method: "get" })
        .then(function (data) {
            var searchLink1 = $(`<a href="${data.articles[0].url}" target="_blank">${data.articles[0].title}</a>`);
            var searchLink2 = $(`<a href="${data.articles[1].url}" target="_blank">${data.articles[1].title}</a>`);
            var searchLink3 = $(`<a href="${data.articles[2].url}" target="_blank">${data.articles[2].title}</a>`);
            $('#title_1').append(searchLink1);
            $('#title_2').append(searchLink2);
            $('#title_3').append(searchLink3);
        });
}

// This function searches the News API for specific stock.
// Sends company name to server and displays news story titles with hyperlinks.  
function searchNewsApi() {
    // Get input from search box
    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        var inputSearchValue = document.getElementById("search-term").value;
        $.ajax({
            method: 'post',
            url: '/api/newsData',
            data: JSON.stringify({ stockName: inputSearchValue }),
            contentType: 'application/json',
            success: function (data) {

                var searchLink1 = $(`<a href="${data.articles[0].url}" target="_blank">${data.articles[0].title}</a>`);
                var searchLink2 = $(`<a href="${data.articles[1].url}" target="_blank">${data.articles[1].title}</a>`);
                var searchLink3 = $(`<a href="${data.articles[2].url}" target="_blank">${data.articles[2].title}</a>`);
                $('#title_1').empty();
                $('#title_2').empty();
                $('#title_3').empty();
                $('#title_1').append(searchLink1);
                $('#title_2').append(searchLink2);
                $('#title_3').append(searchLink3);
            }
        });
    });
}