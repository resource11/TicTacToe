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

// these are the players
var p1 = 'X';
var p2 = 'O';

// set current player to p1
var currPlayer = p1;

// initialize gameId and gameList
var gameId = 0;
var gameList = [];

// these are the credentials
var credentials = {};

// this is the data that will be patched back to the API
// when a cell is marked
var dataCell = {
                game: {
                  cell: {
                    index: 0,
                    value: ''
                  },
                  over: gameOver,
                }
              };

// var $ = require('jquery');

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
          dataCell.game.cell.value = 'X';
          getWinner(isWinner, currPlayer);
          // checkForWinner(currPlayer);
          currPlayer = p2;
        } else {
          $(this).text('O');
          dataCell.game.cell.value = 'O';
          getWinner(isWinner, currPlayer);
          // checkForWinner(currPlayer);
          currPlayer = p1;
        }
        dataCell.game.cell.index = $(this).data('cell');

        tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, markCellCallback);
    }
  });
});
// end $(document).ready(function())

// Game Logic

  // dataCell.game.over = gameOver;

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
  for (var index = 0; index < 3; index++) {
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



// check for winner long way
var checkForWinner = function checkForWinner(currPlayer) {
  if (

  // rows
  $(boxes[0]).text()  === currPlayer && $(boxes[1]).text()  === currPlayer && $(boxes[2]).text() === currPlayer ||
  $(boxes[3]).text()  === currPlayer && $(boxes[4]).text()  === currPlayer && $(boxes[5]).text() === currPlayer ||
  $(boxes[6]).text()  === currPlayer && $(boxes[7]).text()  === currPlayer && $(boxes[8]).text() === currPlayer ||

  $(boxes[0]).text()  === currPlayer && $(boxes[3]).text()  === currPlayer && $(boxes[6]).text() === currPlayer ||
  $(boxes[1]).text()  === currPlayer && $(boxes[4]).text()  === currPlayer && $(boxes[7]).text() === currPlayer ||
  $(boxes[2]).text()  === currPlayer && $(boxes[5]).text()  === currPlayer && $(boxes[8]).text() === currPlayer ||

  $(boxes[0]).text()  === currPlayer && $(boxes[4]).text()  === currPlayer && $(boxes[8]).text() === currPlayer ||
  $(boxes[2]).text()  === currPlayer && $(boxes[4]).text()  === currPlayer && $(boxes[6]).text() === currPlayer)

  { winner = currPlayer;
    // this is the winner message
    var winnerMessage = 'Winner is ' + winner;

    // myApp.gameOver = true;

    // put the winner message in the message box
    $('.player-messages').text(winnerMessage);
    console.log('Winner is ' + currPlayer);

    if (winner === 'X') {
      // increment the X win counter
      $('#score-player-01').html(++p1Win);


    } else if (winner === 'O') {
      // increment the O win counter
      $('#score-player-02').html(++p2Win);
    }
    // set the gameOver state to true
    gameOver = true;
    return;

    // set the gameOver to true. PATCH gameOver property to database

    // refactor the isBoardFull to return a boolean
  } else if (isBoardFull()) {
      console.log('the cat has it');
      // put the cat's game message in the message box
      $('.player-messages').text('Cat\'s Game!');
      gameOver = true;
      return;
      // set the gameOver to true. PATCH gameOver property to database
    }

};




// check for Cat's Game
// count for empty boxes
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





// // click event handler for game pieces
//   $(box).on('click', function() {
//     // if the gameboard isn't empty or the game is over
//     if ($(this).text() !== '' || gameOver === true) {
//       console.log('you can\'t click on that box!');
//     } else {
//     if (player === p1) {
//           $(this).text('X');
//           dataCell.game.cell.index = $(this).data('cell');
//           dataCell.game.cell.value = 'X';
//           checkForWinner(player);
//           tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, markCellCallback);
//           player = p2;
//       } else {
//           $(this).text('O');
//           dataCell.game.cell.index = $(this).data('cell');
//           dataCell.game.cell.value = 'O';
//           checkForWinner(player);
//           tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, markCellCallback);
//           player = p1;
//       }

//     };

//   });


// this only worked when I just targeted the .reset-game class
  $('.reset-game').on('click', function() {
    $(boxes).text('');
    $('.player-messages').text('');
    currPlayer = p1;
    gameOver = false;
    // create new game on database
    tttapi.createGame(myApp.currentToken, createGameCallback);
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

var createGameCallback = function(err,data) {
  if(err) {
    return console.error(err);
  }
  myApp.boardState = data.game.cells;
  myApp.gameOverState = data.game.over;
  gameId = data.game.id;
  // $('.list-result').text('Game created. Game ID: ' + gameId);
};









