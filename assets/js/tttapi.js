'use strict';

// this is the api for the tic-tac-toe game

// create empty array board when you pull the cells from the API

var game = {
  id: null,
  board: [],
  token: null,
  over: false,
  currentPlayerID: null
}

// note that it is an object
var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
      }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },


// this method ends a game if there's a winner or Cat's Game
  gameOver: function (id, data, token, over, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token,
      },
      contentType: 'application/json; charset=utf-8',
      // looking to send data
      data: JSON.stringify(data),
      dataType:'json'
    }, callback);
  },


// this method authenticates a user from a separate computer and allows the user to watch the game moves from another computer
  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};

// cool! ththe below $(function() ... is shorthand for
//$(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });

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
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

//     $('#list-games').on('submit', function(e) {
//     // var token = $(this).children('[name="token"]').val();
//     e.preventDefault();
//     tttapi.listGames(game.token, callback);
//   });

// var drawBoard = function(board){ // assume board is an array of strings
//   $(boxes).each(function(index){
//     $(this).text(game.board[index]);
//   });
// };
// // createGame callback function
// var createGameCallback = function createGameCallback(error, data) {
//       if (error) {
//         console.error(error);
//         $('#result').val('status: ' + error.status + ', error: ' + error.error);
//         return;
//       }
//       $('#result').val(JSON.stringify(data, null, 4));
//       game.board = data.game.cells;
//       game.over = data.game.over;
//       game.id = data.game.id;
//       drawBoard(game.board);
//       console.log(game.board);
//       $('.player-messages').text('Game created. Game ID: ' + game.id);
// };

// // uses the createGame method to create a game on button click
//   $('#create-game').on('submit', function(e) {
//     e.preventDefault();
//     tttapi.createGame(game.token, createGameCallback);
//   });

//   // showGame callback function
// var showGameCallback = function showGameCallback(error, data) {
//       if (error) {
//         console.error(error);
//         $('#result').val('status: ' + error.status + ', error: ' + error.error);
//         return;
//       }
//       $('#result').val(JSON.stringify(data, null, 4));
//       game.board = data.game.cells;
//       game.over = data.game.over;
//       game.id = data.game.id;
//       drawBoard(game.board);
//       console.log(game.board);
//       $('.player-messages').text('Game loaded. Game ID: ' + game.id);
// };

// // uses the showGame method to show game
//   $('#show-game').on('submit', function(e) {
//     var id = $('#show-id').val();
//     e.preventDefault();
//     tttapi.showGame(id, game.token, showGameCallback);
//   });

});

