var winOptions = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [4, 5, 6], [2, 5, 8], [3, 5, 7], [7, 8, 9], [3, 6, 9]];
var board = [, 0, "X", 0, "O", "X", 0, "O", 0, 0];

var result;
for(var i = 0; i < winOptions.length; i++){         //iterate through every win option
    var p1 = winOptions[i][0];                      //save win positions
    var p2 = winOptions[i][1];
    var p3 = winOptions[i][2];
    var b1 = board[p1];                   //check win positions against current board
    var b2 = board[p2];
    var b3 = board[p3];
    if (b1 == b2 && b1 == b3 && b2 == b3 && b3 != 0) {
        result = {winner: b1};
    } else if (b1 == b2 && b2 != 0) {
        result = {nextSuggesteMove: p3};
    } else if (b1 == b3 && b3 != 0) {
        result = {nextSuggesteMove: p3};
    } else if (b2 == b3 && b3 != 0) {
        result = {nextSuggesteMove: p3};
    } 
}

console.log(result.nextSuggesteMove);