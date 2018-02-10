var pattern = [,];
var input = [,];
var strict = false;
var power = false;
var audios = {
    "green": "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "red": "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "yellow": "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "blue": "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
};

$(document).ready(function () {

    $("#checkToTurnOn").change(powerToggle);
    $("#selectStrict").change(strictToggle);
    $("#startBtn").click(handleStartClick);
    $(".colorBtns").mousedown(handleColorMousedown);
    $(".colorBtns").mouseup(handleColorMouseUp);
    $("#win").hide();

});

var strictToggle = function () {

    if (strict == false) {
        strict = true;
    } else {
        strict = false;
    }

};

var powerToggle = function () {

    if (power == true) {
        power = false;
        $("#startBtn").attr("disabled", "disabled");
        $("#counter").text("00");
        disableColorBtns();
    } else {
        power = true;
        $("#startBtn").removeAttr("disabled");
    }

};

var handleStartClick = function () {
    restart();
};

var restart = function () {
    resetColors();
    resetPattern();
    resetInput();
    $("#win").hide();
    $("#counterMain").show();
    $("#counter").text("00");
    disableColorBtns();
    nextMove();
};

var handleColorMousedown = function (event) {

    var color = event.currentTarget.id;

    input.push(color);
    playSound(color);

    var newHue = getHighlight(color);
    displayHighlight(color, newHue);
};

var handleColorMouseUp = function () {
    resetColors();
    checkUserInput();

    if (input.length == pattern.length) {
        if (pattern.length == 20) {
            setTimeout(handleUserWin, 500);
        } else {
            resetColors();
            resetInput();
            disableColorBtns();
            nextMove();
        }
    }
};

var checkUserInput = function () {

    for (var i = 1; i < input.length; i++) {
        if (input[i] != pattern[i]) {
            if (strict) {
                setTimeout(notifyUserOfMistake, 500);
                setTimeout(restart, 1500);
            } else {
                resetColors();
                resetInput();
                disableColorBtns();
                setTimeout(notifyUserOfMistake, 500);
                setTimeout(displayPattern, 1500);
            }
        }
    }
};

var notifyUserOfMistake = function () {
    setTimeout(displayAllHighlights, 250);
    playAllSounds();
    setTimeout(playAllSounds, 500);
    setTimeout(endDisplayPattern, 500);
    setTimeout(displayAllHighlights, 750);
    setTimeout(endDisplayPattern, 1000);
};

var nextMove = function () {

    handleNextColor();
    displayCounter();

};

var handleNextColor = function () {
    var nextColor = generateRandomColor();
    pattern.push(nextColor);
    displayPattern();
};

var displayPattern = function () {

    var DL1 = 750; // DL = display length
    var DL2 = 500;
    var DL3 = 350;

    var displayColor = function (p) {

        resetColors();

        var color = pattern[p];
        var newHue = getHighlight(color);
        displayHighlight(color, newHue);

        playSound(color);
    };

    for (var i = 1; i < pattern.length; i++) {

        if (pattern.length <= 10) {
            setTimeout(displayColor, i * DL1, i);
        } else if (pattern.length <= 15) {
            setTimeout(displayColor, i * DL2, i);
        } else {
            setTimeout(displayColor, i * DL3, i);
        }

    };

    if (pattern.length <= 10) {
        setTimeout(endDisplayPattern, pattern.length * DL1);
    } else if (pattern.length <= 15) {
        setTimeout(endDisplayPattern, pattern.length * DL2);
    } else {
        setTimeout(endDisplayPattern, pattern.length * DL3);
    }

};

var handleUserWin = function () {

    disableColorBtns();
    flash();
    setTimeout(restart, 5000);

};



var flash = function(){

    $("#counterMain").hide();
    $("#win").css("color","red");

    setTimeout(hide, 500);
    setTimeout(show, 1000);
    setTimeout(hide, 1500);
    setTimeout(show, 2000);
    setTimeout(hide, 2500);
    setTimeout(show, 3000);
    setTimeout(hide, 4000);
    setTimeout(show, 5000);
}

var show = function(){
    $("#win,#green,#red,#blue,#yellow").show();
}

var hide = function(){
    $("#win,#green,#red,#blue,#yellow").hide();
};

var playAllSounds = function () {
    playSound("green");
    playSound("red");
    playSound("yellow");
    playSound("blue");
};

var displayAllHighlights = function () {
    displayHighlight("green", "#77c979");
    displayHighlight("red", "#f0826f");
    displayHighlight("yellow", "#ffe09e");
    displayHighlight("blue", "#839afd");
};

var generateRandomColor = function () {
    var position = Math.floor(Math.random() * 4);
    if (position == 0) {
        return "green";
    } else if (position == 1) {
        return "red";
    } else if (position == 2) {
        return "yellow";
    } else if (position == 3) {
        return "blue";
    }
};

var playSound = function (color) {

    var audio = new Audio(audios[color]);
    audio.play();

};

var displayHighlight = function (color, newHue) {
    var colorId = "#" + color;
    $(colorId).css('background-color', newHue);

};

var endDisplayPattern = function () {
    resetColors();
    $(".colorBtns").removeAttr("disabled");
}

var resetColors = function () {

    $("#green,#green:disabled").css('background-color', "#008d05");
    $("#red,#red:disabled").css('background-color', "#da2202");
    $("#yellow,#yelllow:disabled").css('background-color', "#ffae00");
    $("#blue,#blue:disabled").css('background-color', "#0027d3");

};

var getHighlight = function (color) {

    if (color == "green") {
        return "#77c979";
    } else if (color == "red") {
        return "#f0826f";
    } else if (color == "yellow") {
        return "#ffe09e";
    } else if (color == "blue") {
        return "#839afd";
    }

};

var resetInput = function () {
    input = [,];
};

var resetPattern = function () {
    pattern = [,];
};

var disableColorBtns = function () {
    $(".colorBtns").attr("disabled", "disabled");
};

var displayCounter = function () {
    if (pattern.length < 10) {
        $("#counter").text("0" + (pattern.length - 1).toString());
    } else {
        $("#counter").text(pattern.length);
    }
};