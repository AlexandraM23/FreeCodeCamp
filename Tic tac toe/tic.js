var userChoice = null;
var computer = null;
var board = [, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var winOptions = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [4, 5, 6], [2, 5, 8], [3, 5, 7], [7, 8, 9], [3, 6, 9]];

$(document).ready(function () {

    if(userChoice == null){
        $(".square").clearQueue();
    }

    $("#X").click(setUserChoice);
    $("#O").click(setUserChoice);
    
    $(".square").click(handleSquareClick);
    
});

var handleSquareClick = function(event){

    var clickedSquareNumber = parseInt(event.currentTarget.id);

    if(board[clickedSquareNumber] == 0){
        handleUserMove(clickedSquareNumber);
    }

};


var setUserChoice = function(event){
    
    choice = event.currentTarget.id;

    if (choice == "X") {
        userChoice = "X";
        computer = "O";
    } else {
        userChoice = "O";
        computer = "X";
    }

    goToGamePage();
};

var goToGamePage = function () {

    $(".choicePage").hide();
    $(".gamePage").show();

};


var handleUserMove = function (clickedSquareNumber) {

    var userMoveDisplayId = "#" + clickedSquareNumber.toString();

    updateBoard(clickedSquareNumber, userChoice);
    displayMove(userMoveDisplayId, userChoice);

    var nextMove = checkProgress("computer");

    if (nextMove == "random move") {

        var randomPos = randomAvailablePosition(board);
        handleComputerMove(randomPos);

    } else if (nextMove && nextMove.hasOwnProperty("nextSuggestedMove")) {

        handleComputerMove(nextMove.nextSuggestedMove);

    } else if (nextMove && nextMove.hasOwnProperty("winner")) {

        handleResult(nextMove.winner);

    } else {

        handleResult("draw");

    }

};

var handleComputerMove = function (computerMoveOnBoard) {

    computerMoveId = "#" + computerMoveOnBoard.toString();

    updateBoard(computerMoveOnBoard, computer);
    displayMove(computerMoveId, computer);

    var nextMove = checkProgress("user");

    if (nextMove && nextMove.hasOwnProperty("winner")) {

        handleResult(nextMove.winner);

    } else if (nextMove == "draw") {

        handleResult("draw");

    }

};

var handleResult = function (result) {

    if (result == "draw") {
        goToResultPage();
        $(".resultPage").text("Boo, it's a draw!");
        $(".resultPage").click(restart);
    } else if (result == userChoice) {
        goToResultPage();
        $(".resultPage").text("And the winner is YOU");
        $(".resultPage").click(restart);
    } else {
        goToResultPage();
        $(".resultPage").text("Sorry, the computer won this time");
        $(".resultPage").click(restart);
    }

};

var checkProgress = function (whoseTurn) {

    var numberOfMoves = currentNumberOfMoves();
    var win = checkWhoWon();

    if (numberOfMoves < 3) {
        return "random move";
    } else if (numberOfMoves == 9 && win == "no win yet") {
        return "draw";
    }

    if (win == "no win yet" && whoseTurn == "computer") {
        var suggestORrandom = whereNext();
        if(suggestORrandom){
            return suggestORrandom;
        } else {
            return "random move";
        } 
    } else if (win != "no win yet") {

        return win;

    }

    if (whoseTurn == "computer") {

        return "random move";

    }

};

var randomAvailablePosition = function (boardArray) {
    var currFreePositions = [];
    boardArray.map(function (val, index) {
        if (val == 0) {
            currFreePositions.push(index);
        }
    });

    return currFreePositions[Math.floor(Math.random() * (currFreePositions.length - 1))];
};

var displayMove = function (position, symbol) {
    $(position).text(symbol);
};

var updateBoard = function (position, symbol) {
    board[position] = symbol;
};

var checkWhoWon = function () {
    for (var i = 0; i < winOptions.length; i++) {         //iterate through every win option
        var p1 = winOptions[i][0];                      //save win positions
        var p2 = winOptions[i][1];
        var p3 = winOptions[i][2];
        var b1 = board[p1];                             //check win positions against current board
        var b2 = board[p2];
        var b3 = board[p3];
        if (b1 == b2 && b1 == b3 && b2 == b3 && b3 != 0) {
            return { winner: b1 };
        }
    }
    return "no win yet";
};

var whereNext = function () {
    for (var i = 0; i < winOptions.length; i++) {         //iterate through every win option
        var p1 = winOptions[i][0];                      //save win positions
        var p2 = winOptions[i][1];
        var p3 = winOptions[i][2];
        var b1 = board[p1];                             //check win positions against current board
        var b2 = board[p2];
        var b3 = board[p3];
        if (b1 == b2 && b2 != 0 && b3 == 0) {
            return { nextSuggestedMove: p3 };
        } else if (b1 == b3 && b3 != 0 && b2 == 0) {
            return { nextSuggestedMove: p2 };
        } else if (b2 == b3 && b3 != 0 && b1 == 0) {
            return { nextSuggestedMove: p1 };
        }
    }
}

var currentNumberOfMoves = function () {
    return board.reduce(function (acc, curr) {
        if (curr == "X" || curr == "O") {
            acc++;
        }
        return acc;
    }, 0);
};

var goToResultPage = function () {

    $(".gamePage").hide();
    $(".resultPage").show();
    
};

var restart = function () {
    $(".resultPage").hide();
    $(".choicePage").show();
    resetBoard();
    resetDisplay();
};

var resetBoard = function () {
    board = [, 0, 0, 0, 0, 0, 0, 0, 0, 0];
};

var resetDisplay = function () {
    for (var i = 1; i < 10; i++){
        var id = "#" + i.toString();
        $(id).text("");
    }
}


