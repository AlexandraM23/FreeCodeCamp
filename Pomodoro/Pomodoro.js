var interval;

$(document).ready(function () {
    $("#break-length").text("5");
    $("#session-length").text("25");
    $(".opKeyBreak").click(opBreakPressed);
    $(".opKeySession").click(opSessionPressed);
    $("#startButton").click(startSession);
    $("#stopButton").click(stopSession);
    $("#elapsing").text("25");
});

var timer = function (min, sec) {
    var decrease = function () {
        sec--;
        if (sec == 0) {
            sec = 60;
            min--;
        }

        if (min == 0 && sec == 1) {
            clearInterval(interval);
            breakTime();
        }

        if (min >= 10 && sec >= 10) {
            $("#elapsing").text(min + ":" + sec);
        } else if (min >= 10 && sec < 10) {
            $("#elapsing").text(min + ":0" + sec);
        } else if (min < 10 && sec >= 10) {
            $("#elapsing").text("0" + min + ":" + sec);
        } else if (min < 10 && sec < 10) {
            $("#elapsing").text("0" + min + ":0" + sec);
        }
    }
    interval = setInterval(decrease, 1000);
}

var breakTime = function () {
    $("#currentStatus").text("Break!");
    var breakMin = readBreakLength() - 1;
    timer(breakMin, 60);
}

var opSessionPressed = function (event) {
    clearInterval(interval);

    var op = event.currentTarget.id;
    var currSession = readSessionLength();
    var newTime = eval(currSession + op + "1");
    if (newTime > 0 && newTime <= 60) {
        writeSessionLength(newTime);
        $("#elapsing").text(newTime);
    }


};

var opBreakPressed = function (event) {
    var op = event.currentTarget.id;
    var currBreak = readBreakLength();
    var newTime = eval(currBreak + op + "1");
    if (newTime > 0 && newTime <= 60) {
        writeBreakLength(newTime);
    }
};

var startSession = function () {

    if (interval == undefined) {
        var sessionMin = readSessionLength() - 1;
        timer(sessionMin, 60);
    } else if (interval >= 1) {
        clearInterval(interval);
        var currMin = $("#elapsing").text().substring(0, 2);
        var currSec = $("#elapsing").text().substring(3);
        if (currSec == "") {
            timer(currMin, 60);
        } else if (currMin == "00") {
            timer(0, currSec);
        } else {
            time(currMin, currSec);
        }


    }

};

var stopSession = function () {
    clearInterval(interval);
};

var readBreakLength = function () {
    return $("#break-length").text();
};

var readSessionLength = function () {
    return $("#session-length").text();
};

var writeBreakLength = function (val) {
    $("#break-length").text(val);
};

var writeSessionLength = function (val) {
    $("#session-length").text(val);
};