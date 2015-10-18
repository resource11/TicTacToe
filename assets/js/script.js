'use strict';

// begin scripts


// var $ = require('jquery');

$(document).ready(function() {

// finds each box in the grid
  var gameOver = false;
  var winner = null;
  var boxGrid = $('#tic-tac-holder').children();
  var box = $('.box');
  var player01Win = 0;
  var player02Win = 0;
  var player01 = 'X';
  var player02 = 'O';
  var player = player01;
  var gameId = 0;
  var gameList = [];
  var credentials = {};
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



// check for winner long way
var checkForWinner = function checkForWinner(player) {
  if (
  $(boxGrid[0]).text()  === player && $(boxGrid[1]).text()  === player && $(boxGrid[2]).text() === player ||
  $(boxGrid[3]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[5]).text() === player ||
  $(boxGrid[6]).text()  === player && $(boxGrid[7]).text()  === player && $(boxGrid[8]).text() === player ||
  $(boxGrid[0]).text()  === player && $(boxGrid[3]).text()  === player && $(boxGrid[6]).text() === player ||
  $(boxGrid[1]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[7]).text() === player ||
  $(boxGrid[2]).text()  === player && $(boxGrid[5]).text()  === player && $(boxGrid[8]).text() === player ||
  $(boxGrid[0]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[8]).text() === player ||
  $(boxGrid[2]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[6]).text() === player)

  { winner = player;

    var winnerMessage = 'Winner is ' + winner;

    // myApp.gameOver = true;

    // increment player win count
    $('.player-messages').text(winnerMessage);
    console.log('Winner is ' + player);
    if (winner === 'X') {
      $('#score-player-01').html(++player01Win);
    } else if (winner === 'O') {
      $('#score-player-02').html(++player02Win);
    }
    gameOver = true;
    return;
    // set the gameOver to true. PATCH gameOver property to database
  } else if (checkForBlanks()) {
      console.log('the cat has it');
      $('.player-messages').text('Cat\'s Game!');
      gameOver = true;
      return;
      // set the gameOver to true. PATCH gameOver property to database
    }

};

// check for Cat's Game
 var checkForBlanks = function checkForBlanks() {
  var boxCount = 0;
  boxGrid.each(function() {
    if ($(this).text() !== '') {
      boxCount += 1;
    }
  });
  if (boxCount === 9) {
      return 'Cat\'s game';
    }
};


// use piece/player function here
  $(box).on('click', function() {
    if ($(this).text() !== '' || gameOver === true) {
      console.log('you can\'t click on that box!');
    } else {
    if (player === player01) {
          $(this).text('X');
          dataCell.game.cell.index = $(this).data('cell');
          dataCell.game.cell.value = 'X';
          checkForWinner(player);
          tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, function(err, data){
            if(err) {
                return console.error(err);
            }
            $('#result').val(JSON.stringify(data, null, 4));
          });
          player = player02;
      } else {
          $(this).text('O');
          dataCell.game.cell.index = $(this).data('cell');
          dataCell.game.cell.value = 'O';
          checkForWinner(player);
          tttapi.markCell(myApp.currentGameID, dataCell, myApp.currentToken, function(err, data){
            if(err) {
                return console.error(err);
            }
            $('#result').val(JSON.stringify(data, null, 4));
          });
          player = player01;
      }

    };

  });

// this only worked when I just targeted the .reset-game class
  $('.reset-game').on('click', function() {
    $(boxGrid).text('');
    $('.player-messages').text('');
    player = player01;
    gameOver = false;
    // create game to server
    tttapi.createGame(tttapi.token,
        function(err,data) {
            if(err) {
                return console.error(err);
            }
            gameId = data.game.id;
            // $('.list-result').text('Game created. Game ID: ' + gameId);
        }
    );
  });

  $('.reset-score').on('click', function() {
    player01Win = 0;
    player01Win = 0;
    $('#score-player-01').html(0);
    $('#score-player-02').html(0);
  });



  $('.test-data-stuff').click(function() {
    if ( $('.test-data-stuff').is(':hidden') ) {
      $( "div" ).show( "slow" );
    } else {
      $( "div" ).slideUp();
    }
  });


});




// end $(document).ready(function())

