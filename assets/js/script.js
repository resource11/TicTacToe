'use strict';

//global variables

// initialize the gameOver status, winner status and player scores
var gameOver = false;
var winner = null;
var p1Win = 0;
var p2Win = 0;

// set each child of #tic-tac-holder to variable 'boxes'
var boxes = $('#tic-tac-holder').children();

// so we only traverse the DOM once to find elements with a class of 'box'
var box = $('.box');

// these are the players and the currentPlayer
var p1 = 'X';
var p2 = 'O';
var currPlayer = p1;

// initialize gameId and gameList
var gameId = 0;
var gameList = [];

// this is the data that will be patched back to the API
// when a cell is marked
var data = {
                game: {
                  cell: {
                    index: 0,
                    value: ''
                  },
                  over: gameOver,
                }
              };




// Game Logic

var isWinner = function (currPlayer) {

  // rows
  for (var index = 0; index < 3; index++) {
    if (boxes.eq(3 * index).text() === currPlayer &&
        boxes.eq(3 * index + 1).text() === currPlayer &&
        boxes.eq(3 * index + 2).text() === currPlayer) {
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
  if ((boxes.eq(0).text() === currPlayer && boxes.eq(4).text() === currPlayer && boxes.eq(8).text() === currPlayer) ||
     (boxes.eq(2).text() === currPlayer && boxes.eq(4).text() === currPlayer && boxes.eq(6).text() === currPlayer))
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

var getWinner = function getWinner(isWinner, currPlayer) {
  var winnerMessage = 'Winner is ' + currPlayer;

  if (isWinner(currPlayer)) {
    $('.player-messages').text(winnerMessage);
    console.log('Winner is ' + currPlayer);
    gameOver = true;

    if(currPlayer === 'X') {
      $('#score-player-01').html(++p1Win);
    } else if(currPlayer === 'O') {
      $('#score-player-02').html(++p2Win);
    }

  } else if (isBoardFull()) {
    $('.player-messages').text('Cat\'s Game!');
    console.log('the cat has it');
    gameOver = true;
    return;
  }
};

// begin click event handlers
$(document).ready(function() {

// click event handler for game pieces
  $(box).on('click', function() {
    // if the gameboard isn't empty or the game is over
    if (gameOver === true) {
      $('.player-messages').text('Game is over. No more moves.');
      console.log('Sorry, game is over.');
    } else if ($(this).text() !== '') {
      $('.player-messages').text('That box is taken, pick another.');
      console.log('you can\'t click on that box!');
    } else {
      if (currPlayer === p1) {
          $(this).text('X');
          data.game.cell.value = 'X';
          getWinner(isWinner, currPlayer);
          currPlayer = p2;
        } else {
          $(this).text('O');
          data.game.cell.value = 'O';
          getWinner(isWinner, currPlayer);
          currPlayer = p1;
        }
        data.game.cell.index = $(this).data('cell');

        tttapi.markCell(game.id, data, game.token, markCellCallback);
    }
  });
});
// end click event handlers



// this only worked when I just targeted the .reset-game class
  $('.reset-game').on('click', function() {
    $(boxes).text('');
    $('.player-messages').text('');
    currPlayer = p1;
    gameOver = false;
    // create new game on database
    tttapi.createGame(game.token, createGameCallback);
  });

  $('.reset-score').on('click', function() {
    p1Win = 0;
    p2Win = 0;
    $('#score-player-01').html(0);
    $('#score-player-02').html(0);
  });




  // $('.test-data-stuff').click(function() {
  //   if ( $('.test-data-stuff').is(':hidden') ) {
  //     $( "div" ).show( "slow" );
  //   } else {
  //     $( "div" ).slideUp();
  //   }
  // });

// login/register boxes animation click handlers
  // $('.header-buttons').on('click', function() {
  //   $(this).find('.API-connector').slideToggle('fast');
  // })



// // callback functions
var markCellCallback = function(err, data) {
  if(err) {
    return console.error(err);
  }
  $('#result').val(JSON.stringify(data, null, 4));
  // }
};








