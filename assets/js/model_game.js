'use strict';


// shorthand for$(document).ready(...
$(function() {

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#list-games').on('submit', function(e) {
      e.preventDefault();
      tttapi.listGames(game.token, callback);
    });

  // function to draw a new board
    var drawBoard = function(board){
    $(boxes).each(function(index){
      $(this).text(board[index]);
    });
  };

  // createGame callback function
  var createGameCallback = function createGameCallback(error, data) {
      if (error) {
        console.error(error);
        $('#result').val('status: ' + error.status + ', error: ' + error.error);
        return;
      }
      $('#result').val(JSON.stringify(data, null, 4));
      game.board = data.game.cells;
      game.over = data.game.over;
      game.id = data.game.id;
      drawBoard(game.board);
      console.log(game.board);
      $('.player-messages').text('Game created. Game ID: ' + game.id);
  };

// uses the createGame method to create a game on button click
  $('#create-game').on('submit', function(e) {
    e.preventDefault();
    tttapi.createGame(game.token, createGameCallback);
  });

  // showGame callback function
  var showGameCallback = function showGameCallback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' + error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    game.board = data.game.cells;
    game.over = data.game.over;
    game.id = data.game.id;
    drawBoard(game.board);
    console.log(game.board);
    $('.player-messages').text('Game loaded. Game ID: ' + game.id);
  };

  // uses the showGame method to show game
  $('#show-game').on('submit', function(e) {
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, game.token, showGameCallback);
  });

});

// end submit event handlers
