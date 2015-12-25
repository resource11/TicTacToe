'use strict';

var gameID, gameOver, userToken;
var gameBoard = [];


// var playerID = null;
// var player_x = null;
// var player_o = null;
// var turns = 0;



// this is the data that will be patched back to the API
// when a cell is marked
var data = {
              game: {
                cell: {
                  index: null,
                  value: ''
                },
                over: false
              }
            };



//$(document).ready(...
$(function() {

  // register a user
  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });


  // login a user
  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      // $('.token').val(data.user.token);
      userToken = data.user.token;
      console.log(userToken);
      $('.player-messages').text('Welcome, user #' + data.user.id);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  // list user-created games
  $('#list-games').on('submit', function(e) {
    e.preventDefault();
    tttapi.listGames(userToken, callback);
  });


  // create a new game
  $('#create-game').on('submit', function(e) {
    e.preventDefault();
    tttapi.createGame(userToken, createGameCallback);
  });


  // show a game from a particular game id
  $('#show-game').on('submit', function(e) {
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, userToken, showGameCallback);
  });

  // click event handler for game pieces
  $(box).on('click', function() {
    // if the gameboard isn't empty or the game is over
    if (gameOver === true) {
      $('.player-messages').text('Game is over. No more moves.');
      console.log('Sorry, game is over.');
    } else if ($(this).text() === '-') {
      $('.player-messages').text('You must log in to play.');
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
        tttapi.markCell(gameID, data, userToken, markCellCallback);
    }
  });

  $('.reset-score').on('click', function() {
    p1Win = 0;
    p2Win = 0;
    $('#score-player-01').html(0);
    $('#score-player-02').html(0);
  });


  $('#register-button').on('click', function() {
    $('.API-register').slideDown();
    $('.API-register').removeClass('hidden');
  });

  $('#login-button').on('click', function() {
    $('.API-login').slideDown();
    $('.API-login').removeClass('hidden');
  });

  $('.top-reg-button').on('click', function() {
    $('.API-register').slideUp();
  });
  $('.top-login-button').on('click', function() {
    $('.API-login').slideUp();
  });

  $('.tester').on('click', function() {
    $('.test-data-stuff').fadeIn();
    $('.test-data-stuff').removeClass('hidden');
  });

  $('.close-me').on('click', function() {
    $('.test-data-stuff').fadeOut();
  });

});
// end document ready
