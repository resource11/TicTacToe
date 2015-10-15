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

// gets the list of created games
  $('#list-games').on('submit', function(e) {
    // var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(myApp.currentToken, callback);
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
      // don't redefine the token or the game will break
      // this is hidden on purpose
      // you only get the token when you log in
      // myApp.currentToken = data.game.token;
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
    // var token = $(this).children('[name="token"]').val();
    // var id = $('#show-id').val();

    //select game id from list and set that as the current ID
    e.preventDefault();
    tttapi.showGame(myApp.currentGameID, myApp.currentToken, callback);
  });
// uses the joinGame method to join a game
  $('#join-game').on('submit', function(e) {
    // var token = $(this).children('[name="token"]').val();
    // var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(myApp.currentGameID, myApp.currentToken, callback);


  });

  // markCell callback function
var markCellCallback = function markCellCallback(error, data) {
      if (error) {
        console.error(error);
        $('#result').val('status: ' + error.status + ', error: ' + error.error);
        return;
      }
      $('#result').val(JSON.stringify(data, null, 4));
      console.log(myApp.currentCellIndex);
      console.log(myApp.currentCellValue);
      // check for winner or cat's game and
      // set gameOverState to true if so
      //
};
// uses the markCell method to mark a game piece
    $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(myApp.currentGameID, data, myApp.currentToken, markCellCallback);
  });




  // // uses the markCell method to mark a game piece
  // $('.box').on('click', function(e) {
  //   // myApp.currentCellValue = $(this).text();
  //   // myApp.currentCellIndex = $(this).data('cell');
  //   // console.log(myApp.currentCellIndex);
  //   // console.log(myApp.currentCellValue);

  //   // wrap the data of cell index and value into game {}
  //   var data = wrap('game', wrap('cell', {'index': myApp.currentCellIndex, 'value': myApp.currentCellValue}));
  //   e.preventDefault();
  //   tttapi.markCell(myApp.currentGameID, data, myApp.currentToken, callback);
  // });


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


// function(err, data){
//       if (err) {console.error(err)}
//       game.id = data.game.id;
//     }
