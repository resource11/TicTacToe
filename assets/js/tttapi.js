'use strict';

// this is the api for the tic-tac-toe game

// create empty array boardState when you pull the cells from the API

var myApp = {
  currentGameID: null,
  boardState: [],
  currentToken: null,
  gameOverState: false,
  currentCell: null,
  currentCellIndex: 0,
  currentCellValue: '',
  player_x: null,
  player_o: null,
  currentPlayerID: null,
  player_x_ID: null,
  player_o_ID: null,
  player_x_token: null,
  player_o_token: null

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
  gameOver: function (id, data, token, gameOverState) {
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
      myApp.currentToken = data.user.token;
      console.log(myApp.currentToken);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

var listGamesCallback = function listGamesCallback(error, data) {
  // myApp.gameList = data.games;
  // console.log(myApp.gameList);
  // console.log(data.games);
  // retrieved games, how to extract id
  // the below doesn't do it
  for (var i = 0; i < data.games.length; i++) {
    // for (var j = 0; j < data.games.length; j++) {
    //   myApp.currentGameID[i[j]] = data.games[i[j]];
    //   console.log(myApp.currentGameID);
    // }
    myApp.currentGameID[i] = data.games[i].id;
    myApp.currentCell[i] = data.games[i].cells;

    $('#result').val(JSON.stringify(data, null, 4));
  }
  // $(data.games.id).each(function(index, el) {
  //   myApp.currentGameID = data.games.id;
  //   console.log(myApp.currentGameID);
  // });

}

// gets the list of created games
  $('#list-games').on('submit', function(e) {
    e.preventDefault();
    tttapi.listGames(myApp.currentToken, listGamesCallback);
  });

// createGame callback function
var createGameCallback = function createGameCallback(error, data) {
      if (error) {
        console.error(error);
        $('#result').val('status: ' + error.status + ', error: ' + error.error);
        return;
      }
      $('#result').val(JSON.stringify(data, null, 4));
      myApp.boardState = data.game.cells;
      myApp.gameOverState = data.game.over;
      myApp.currentGameID = data.game.id;
      console.log(myApp.boardState);
};

// uses the createGame method to create a game on button click
  $('#create-game').on('submit', function(e) {
    // var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(myApp.currentToken, createGameCallback);
  });

// uses the showGame method to show game
  $('#show-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();

    //select game id from list and set that as the current ID
    e.preventDefault();
    tttapi.showGame(id, myApp.currentToken, callback);
  });
// uses the joinGame method to join a game
  $('#join-game').on('submit', function(e) {
    // var token = $(this).children('[name="token"]').val();
    // var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(myApp.currentGameID, myApp.currentToken, callback);
  });


// allows a second player to watch moves remotely while
// logged in to the game from a separate computer
// need to add variables in here if doing this one
  $('#watch-game').on('submit', function(e){
    var token = $(this).children('[name="token"]').val();
    var id = $('#watch-id').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      $('#watch-index').val(cell.index);
      $('#watch-value').val(cell.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

});

