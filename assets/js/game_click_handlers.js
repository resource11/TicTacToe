'use strict';


// game session info
var game = {
  id: null,
  board: [],
  token: null,
  over: false
};



// var myApp = {
//   currentGameID: null,
//   boardState: [],
//   currentToken: null,
//   gameOverState: false,
//   currentCell: null,
//   currentCellIndex: 0,
//   currentCellValue: '',
//   player_x: null,
//   player_o: null,
//   currentPlayerID: null,
//   player_x_ID: null,
//   player_o_ID: null,
//   player_x_token: null,
//   player_o_token: null

// }



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
      game.token = data.user.token;
      console.log(game.token);
      $('.player-messages').text('Welcome, user #' + data.user.id);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  // list user-created games
  $('#list-games').on('submit', function(e) {
    e.preventDefault();
    tttapi.listGames(game.token, callback);
  });


  // create a new game
  $('#create-game').on('submit', function(e) {
    e.preventDefault();
    tttapi.createGame(game.token, createGameCallback);
  });


  // show a game from a particular game id
  $('#show-game').on('submit', function(e) {
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, game.token, showGameCallback);
  });

  // click event handler for game pieces
  $(box).on('click', function() {
    // if the gameboard isn't empty or the game is over
    if (data.game.over === true) {
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
        tttapi.markCell(game.id, data, game.token, markCellCallback);
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

});
// end document ready
