'use strict';

var gameID, gameOver, userToken;
var gameBoard = [];


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

// API endpoint
const myApp = {
baseUrl: 'http://tic-tac-toe.wdibos.com',
};

//$(document).ready(...
$(function() {

  // register a user
  $('#register').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
  });


  // login a user
  $('#login').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('.player-messages').text(`Oh noes! ${error.error}`);
        return;
      }
      callback(null, data);
      // $('.token').val(data.user.token);
      userToken = data.user.token;
      tttapi.listGames(userToken, listGamesCallback);

      $('.player-messages').text(`Welcome, user #${data.user.id}`);
      $('#API-signon__dialog').fadeOut();
      $('#API-signon__dialog').addClass('hidden');
      $('.container').removeClass('hidden');
    };
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
      $('.player-messages').text(`Game is over. No more moves.`);
    } else if ($(this).text() === '-') {
      $('.player-messages').text(`You must log in to play.`);
    } else if ($(this).text() !== '') {
      $('.player-messages').text(`That box is taken, pick another.`);
      console.log('you can\'t click on that box!');
    } else {
      if (currPlayer === p1) {
          $(this).text('X');
          $('.player-messages').text('Hey! It\'s player X\'s turn');
          data.game.cell.value = 'X';
          getWinner(isWinner, currPlayer);
          currPlayer = p2;
        } else {
          $(this).text('O');
          $('.player-messages').text('Now it\'s player O\'s turn');
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
    $('.player-messages').text('Score reset');
  });

  $('#register-link').on('click', function() {
    $('#API-login').fadeOut();
    $('#API-login').addClass('hidden');
    $('#API-register').fadeIn();
    $('#API-register').removeClass('hidden');

  });

  $('#login-link').on('click', function() {
    $('#API-register').fadeOut();
    $('#API-register').addClass('hidden');
    $('#API-login').fadeIn();
    $('#API-login').removeClass('hidden');
  });

  // $('#reg-button').on('click', function() {
      // $('.API-register').fadeOut();
      // $('#API-signon__dialog').fadeOut();
      // $('#API-signon__dialog').addClass('hidden');
  // });

  // $('#login-button').on('click', function() {
      // $('.API-register').fadeOut();
      // $('#API-signon__dialog').fadeOut();
      // $('#API-signon__dialog').addClass('hidden');
  // });

  $('#login-button').on('click', function() {

    $('#API-register').fadeOut();
    $('#API-register').addClass('hidden');
    $('#API-signon__dialog').fadeIn();
    $('#API-signon__dialog').removeClass('hidden');
    $('#API-login').fadeIn();
    $('#API-login').removeClass('hidden');
  });

  $('#register-button').on('click', function() {
    // console.log('clicked');
      $('#API-signon__dialog').fadeIn();
      $('#API-signon__dialog').removeClass('hidden');

      // $('.API-signon').dialog.open();
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
