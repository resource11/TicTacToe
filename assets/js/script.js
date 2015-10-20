'use strict';

// begin scripts


// var $ = require('jquery');

$(document).ready(function() {

// click event handler for game pieces
  $(box).on('click', function() {
    // if the gameboard isn't empty or the game is over
    if ($(this).text() !== '' || gameOver === true) {
      console.log('you can\'t click on that box!');
    } else {
    if (player === player01) {
          $(this).text('X');
          dataCell.game.cell.index = $(this).data('cell');
          dataCell.game.cell.value = 'X';
          checkForWinner(player);
          // tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, function(err, data){
          //   if(err) {
          //       return console.error(err);
          //   }
          //   $('#result').val(JSON.stringify(data, null, 4));
          // });
          tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, markCellCallback);
          player = player02;
      } else {
          $(this).text('O');
          dataCell.game.cell.index = $(this).data('cell');
          dataCell.game.cell.value = 'O';
          checkForWinner(player);
          tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, markCellCallback);
          // tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, function(err, data){
          //   if(err) {
          //       return console.error(err);
          //   }
          //   $('#result').val(JSON.stringify(data, null, 4));
          // });
          player = player01;
      }

    };

  });


});
// end $(document).ready(function())

// finds each box in the grid
  var gameOver = false;
  var winner = null;
  // set each child of #tic-tac-holder to variable 'boxes'
  var boxes = $('#tic-tac-holder').children();
  var box = $('.box');

  var p1Win = 0;
  var p2Win = 0;
  // these are the players
  var player01 = 'X';
  var player02 = 'O';
  // this is the player turn
  var player = player01;
  // this is the game ID
  var gameId = 0;
  // this is the list of games
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

  // dataCell.game.over = gameOver;

// var isWinner = function (player) {

//   // rows
//     // 0, 1, 2
//     // 3, 4, 5
//     // 6, 7, 8
//   for (var index = 0; index < 3; index++) {
//     if (boxes.eq(3 * index).text() === player &&
//         boxes.eq(3 * index + 1).text() === player &&
//         boxes.eq(3 * index + 2).text() === player) {
//       return true;
//     }
//   }

//   // cols
//     // 0, 3, 6
//     // 1, 4, 7
//     // 2, 5, 8
//   for (var index = 0; index < 3; index++) {
//     if (boxes.eq(index).text() === player &&
//         boxes.eq(index + 3).text() === player &&
//         boxes.eq(index + 6).text() === player) {
//       return true;
//     }
//   }

//   // diag
//     // 0, 4, 8
//     // 2, 4, 6
//   if ((boxes.eq(0).text() === player && boxes.eq(4).text() === player && boxes.eq(8).text() === player) ||
//      (boxes.eq(2).text() === player && boxes.eq(4).text() === player && boxes.eq(6).text() === player))
//   {
//     return true;
//   }
//   }
//   return false;
// };

// var getWinner = function getWinner(isWinner, player) {
//   var winnerMessage = 'Winner is ' + winner;

//   if (isWinner && player === 'X') {
//     $('.player-messages').text(winnerMessage);
//     console.log('Winner is ' + player);
//     $('#score-player-01').html(++p1Win);

//   } else if (isWinner && player === 'O')  {
//     $('.player-messages').text(winnerMessage);
//     console.log('Winner is ' + player);
//     $('#score-player-02').html(++p2Win);
//   }
// };



// check for winner long way
var checkForWinner = function checkForWinner(player) {
  if (
  $(boxes[0]).text()  === player && $(boxes[1]).text()  === player && $(boxes[2]).text() === player ||
  $(boxes[3]).text()  === player && $(boxes[4]).text()  === player && $(boxes[5]).text() === player ||
  $(boxes[6]).text()  === player && $(boxes[7]).text()  === player && $(boxes[8]).text() === player ||
  $(boxes[0]).text()  === player && $(boxes[3]).text()  === player && $(boxes[6]).text() === player ||
  $(boxes[1]).text()  === player && $(boxes[4]).text()  === player && $(boxes[7]).text() === player ||
  $(boxes[2]).text()  === player && $(boxes[5]).text()  === player && $(boxes[8]).text() === player ||
  $(boxes[0]).text()  === player && $(boxes[4]).text()  === player && $(boxes[8]).text() === player ||
  $(boxes[2]).text()  === player && $(boxes[4]).text()  === player && $(boxes[6]).text() === player)

  { winner = player;
    // this is the winner message
    var winnerMessage = 'Winner is ' + winner;

    // myApp.gameOver = true;

    // put the winner message in the message box
    $('.player-messages').text(winnerMessage);
    console.log('Winner is ' + player);

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
//     if (player === player01) {
//           $(this).text('X');
//           dataCell.game.cell.index = $(this).data('cell');
//           dataCell.game.cell.value = 'X';
//           checkForWinner(player);
//           // tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, function(err, data){
//           //   if(err) {
//           //       return console.error(err);
//           //   }
//           //   $('#result').val(JSON.stringify(data, null, 4));
//           // });
//           tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, markCellCallback);
//           player = player02;
//       } else {
//           $(this).text('O');
//           dataCell.game.cell.index = $(this).data('cell');
//           dataCell.game.cell.value = 'O';
//           checkForWinner(player);
//           tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, markCellCallback);
//           // tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, function(err, data){
//           //   if(err) {
//           //       return console.error(err);
//           //   }
//           //   $('#result').val(JSON.stringify(data, null, 4));
//           // });
//           player = player01;
//       }

//     };

//   });


// this only worked when I just targeted the .reset-game class
  $('.reset-game').on('click', function() {
    $(boxes).text('');
    $('.player-messages').text('');
    player = player01;
    gameOver = false;
    // create game to server
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









