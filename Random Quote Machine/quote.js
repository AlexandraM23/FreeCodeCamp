var colors1 = ["#31255a", "#54416d", "#2b235a","#0c6674"]
var colors2 = ["#ffc6c6", "#ffdddd", "#ff9c9c",	"#ffcfea", "#ffb6d0"];	

$(document).ready(function () {
    getQuoteAndDisplayIt();
    $("#get-quote").click(getQuoteAndDisplayIt);
});

var getQuoteAndDisplayIt = function () {
    transitionColors();
    $.ajax({
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
        headers: { "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V" },
        dataType: "json",
        success: receiveResponse
    });
};

var transitionColors = function(){
    var color1 = randomColor(colors1);
    var color2 = randomColor(colors2);
    $("body").css("background-color", color1);
    $("#get-quote").css("background-color", color1);
    $("#get-quote").css("color", color2);
    $(".card-header").css("border-bottom-color", color1);
    $("#tweet-button").css("color", color1);
    $(".quote-box").css("background-color", color2);
    $(".quote-box").css("color", color1);
    $("#author").css("color", color1);
    $("#title").css("color",color2)
}

var randomColor = function (colorsArray) {
    var length = colorsArray.length;
    var random = Math.floor(Math.random() * length);
    return colorsArray[random];
};

var receiveResponse = function (data) {

    var getQuote = function(){
        $("#quoteText").fadeIn().text(data["quote"]);
        $("#author").fadeIn().text(data["author"]);
    }

    $("#quoteText, #author").fadeOut(500, getQuote);
    
    doStuffWithTwitterButton(data["quote"]);
}

var doStuffWithTwitterButton = function (quote) {
    var oldURL = "https://twitter.com/intent/tweet";
    var encodedQuote = encodeURI(quote);
    var newURL = oldURL + "?text=" + encodedQuote;
    $("#tweet-button").attr("href", newURL);
};




