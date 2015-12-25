'use strict';

// set each child of #tic-tac-holder to variable 'boxes'
var boxes = $('#tic-tac-holder').children();

// so we only traverse the DOM once to find elements with a class of 'box'
var box = $('.box');

// these are the players and the currentPlayer
var p1 = 'X';
var p2 = 'O';
var currPlayer = p1;

// initialize player scores
var p1Win = 0;
var p2Win = 0;



// Game Logic

var isWinner = function (currPlayer) {

  // rows
  for (var index = 0; index < 3; index++) {
    if (boxes.eq(3 * index).text() === currPlayer &&
        boxes.eq(3 * index + 1).text() === currPlayer &&
        boxes.eq(3 * index + 2).text() === currPlayer)
    {
      return true;
    }
  }

  // cols
  for (index = 0; index < 3; index++) {
    if (boxes.eq(index).text() === currPlayer &&
        boxes.eq(index + 3).text() === currPlayer &&
        boxes.eq(index + 6).text() === currPlayer)
      { return true; }
  }

  // diag
  if ((boxes.eq(0).text() === currPlayer &&
    boxes.eq(4).text() === currPlayer &&
    boxes.eq(8).text() === currPlayer) ||
     (boxes.eq(2).text() === currPlayer &&
      boxes.eq(4).text() === currPlayer &&
      boxes.eq(6).text() === currPlayer))
    { return true; }
  return false;
};

// check for Cat's Game, count empty boxes
var isBoardFull = function isBoardFull() {
  var boxCount = 0;
  boxes.each(function() {
    if ($(this).text() !== '') {
      boxCount += 1;
    }
  });
  if (boxCount === 9) {
      return true;
  }
};

// check for winner
var getWinner = function getWinner(isWinner, currPlayer) {
  var winnerMessage = 'Winner is ' + currPlayer;

  if (isWinner(currPlayer)) {
    $('.player-messages').text(winnerMessage);
    console.log('Winner is ' + currPlayer);
    gameOver = true;
    data.game.over = true;
    tttapi.markCell(gameID, data, userToken, markCellCallback);
    console.log(gameOver);

    if(currPlayer === 'X') {
      $('#score-player-01').html(++p1Win);
    } else if(currPlayer === 'O') {
      $('#score-player-02').html(++p2Win);
    }

  } else if (isBoardFull()) {
    $('.player-messages').text('Cat\'s Game!');
    console.log('the cat has it');
    gameOver = true;
    data.game.over = true;
    tttapi.markCell(gameID, data, userToken, markCellCallback);
    console.log(gameOver);
    return;
  }
};

// end game logic











