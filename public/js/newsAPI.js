// News API Client script.
// This file has two functions. The first function "topHeadlines()" is called first to display 
// to display the the top  three business news headlines that day when the market.html file is first loaded.
// The next function "searchNewsApi()" is called when user selects and click on the the #searchButton.
// The function then sends search value to the Api. Then the Api returns the top three news items related to
// the search value. Both functions display the titles of news headlines that are hyperlinks that the user can
// click on to view the webpage of the story.

// Calls to functions
topHeadlines();
searchNewsApi();

// This function get top head lines news story from the News API and displays them in the market.html file 
// with hyperlinks to stories. 
function topHeadlines(){
    $.ajax({ url: "/api/newsData", method: "get" })
    .then(function(data) {
        var searchLink1 = $(`<a href="${data.articles[0].url}" target="_blank">${data.articles[0].title}</a>`);
        var searchLink2 = $(`<a href="${data.articles[1].url}" target="_blank">${data.articles[1].title}</a>`);
        var searchLink3 = $(`<a href="${data.articles[2].url}" target="_blank">${data.articles[2].title}</a>`);
        // var searchLink4 = $(`<a href="${data.articles[3].url}" target="_blank">${data.articles[3].title}</a>`);
        // var searchLink5 = $(`<a href="${data.articles[4].url}" target="_blank">${data.articles[4].title}</a>`);
        $('#title_1').append(searchLink1); 
        $('#title_2').append(searchLink2); 
        $('#title_3').append(searchLink3); 
        // $('#title_4').append(searchLink4); 
        // $('#title_5').append(searchLink5); 
    }
    );}

// This function searches the News API for specific stock.
//  Sends company name to server and display news stories titles with hyperlinks. This function get input value by 
function searchNewsApi(){
    // Get input from search box
    $("#searchButton").on("click",function(event){  
        event.preventDefault();
        var inputSearchValue = document.getElementById("search-term").value; 
        $.ajax({
            method: 'post',
            url: '/api/newsData',
            data: JSON.stringify({ stockName: inputSearchValue }),
            contentType: 'application/json',
            success: function(data) {
 
                var searchLink1 = $(`<a href="${data.articles[0].url}" target="_blank">${data.articles[0].title}</a>`);
                var searchLink2 = $(`<a href="${data.articles[1].url}" target="_blank">${data.articles[1].title}</a>`);
                var searchLink3 = $(`<a href="${data.articles[2].url}" target="_blank">${data.articles[2].title}</a>`);
                // var searchLink4 = $(`<a href="${data.articles[3].url}" target="_blank">${data.articles[3].title}</a>`);
                // var searchLink5 = $(`<a href="${data.articles[4].url}" target="_blank">${data.articles[4].title}</a>`);
                $('#title_1').empty();
                $('#title_2').empty();
                $('#title_3').empty();
                // $('#title_4').empty();
                // $('#title_5').empty();
                $('#title_1').append(searchLink1); 
                $('#title_2').append(searchLink2); 
                $('#title_3').append(searchLink3); 
                // $('#title_4').append(searchLink4); 
                // $('#title_5').append(searchLink5); 
            }
        });
    });
}