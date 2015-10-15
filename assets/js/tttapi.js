'use strict';

// this is the api for the tic-tac-toe game

// create empty array boardState when you pull the cells from the API

var myApp = {
  boardState: [],
  currentCell: '',
  currentToken: null,
  player_x: null,
  player_o: null,
  currentPlayerID: null,
  currentGameID: null,
  player_x_ID: null,
  player_o_ID: null,
  gameOverState: false
}

// note that it is an object
var tttapi = {
  // var gameData = data.game;
  // var cells = gameData.cells;
  // var index = cell.index
  // var value = cell.value;

  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',
  // this method runs the ajax config and callback
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },
  // method for when you're registering a new user, you need
  // to create a user. This takes in the credentials object
  // and callback function
  //
  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },
// create the method to login a new user
// and callback function
  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType:'json'
    }, callback);
  },

  //Authenticated api actions

  // this method authenticates a user and returns a list of already-created games
  // it takes a token variable and a callback function (the JSON.stringify data)
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      // specify extra headers to send
      headers: {
        Authorization: 'Token token=' + token,
      },
      // GET has no headers, so contentType
      dataType:'json'
    }, callback);
  },

// this method authenticates a user and creates a new game
// (creates token) in the process
  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      // you need to authenticate a user to create a game
      headers: {
        Authorization: 'Token token=' + token,
      },
      // make a request body
      contentType: 'application/json; charset=utf-8',
      // create an empty array
      // do I need to stringify in the actual app or
      // is this just for seeing the content in the result box?
      data: JSON.stringify({}),
      dataType:'json'
    }, callback);
  },

// this method shows one of the created games and authenticates a user
// since a game exists, the url can contain an id
  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token,
      },
     // no request body needed
     dataType:'json'
    }, callback);
  },
// this method authenticates the second user and allows that user to join a game with a specific id
  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games' + id,
      // you need to authenticate a user to create a game
      headers: {
        Authorization: 'Token token=' + token,
      },
      // make a request body
      contentType: 'application/json; charset=utf-8',
      // retrieve an empty array(?)
      data: JSON.stringify({}),
      dataType:'json'
    }, callback);
  },
// this method finds a game with a specific id and marks a cell with a string
  markCell: function (id, data, token, callback) {
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
  // this function creates an object literal and takes form input
  // and looks at each form input element
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      // the var type looks at each input element type attribute
      // if that input attibute has a name attribute and is *not* of
      // type submit and is *not* hidden...
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        // set the key of each data[the name attribute]
        // to the value of the value attribute
        // example: in form element with id 'mark-cell'
        // the first key value pair of the data{} is
        // 'mark-cell': 'Mark Cell'
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };
// this is a wrap function. It looks like it creates
// a object literal that takes a
// root (thing? where does root come from)
// and some formData and wraps it up into an object literal
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };
// this is a callback function. What it does is...
// it first checks for an error. If the callback has
// an error in the element with the id of 'result,
// we get an console.error message
// else we take the contents in the element with the id of 'result'
// and stringify that data. Not sure what the null
//and 4 parameters do in this scenario
  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' + error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };
// here, the .on() method registers a new user
// on click of submit button, the var credentials
// is pointing to the wrap 'credentials' and form objects into a credentials object
// then, the tttapi.register() method uses the credentals and the callback function to register the user
  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });
// this logs in the user on button submit
// the default property of the button has been
// disabled so the data doesn't get sent to the server
// because we don't need it to go to the server
// if this .on() method was looking for a click event
// we wouldn't need to prevent defaults
  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

// gets the list of created games
  $('#list-games').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(token, callback);
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
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, createGameCallback);
  });

// uses the showGame method to show game
  $('#show-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, token, callback);
  });
// uses the joinGame method to join a game
  $('#join-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(id, token, callback);


  });

  // markCell callback function
var markCellCallback = function markCellCallback(error, data) {
      if (error) {
        console.error(error);
        $('#result').val('status: ' + error.status + ', error: ' + error.error);
        return;
      }
      $('#result').val(JSON.stringify(data, null, 4));
      // data.game.cell.index = myApp.currentCellIndex;
      // data.game.cell.value = myApp.currentCellValue;
      console.log(myApp.currentCellIndex);
      console.log(myApp.currentCellValue);
};
// uses the markCell method to mark a game piece
  $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, markCellCallback);
  });
// allows a second player to watch moves remotely while
// logged in to the game from a separate computer
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
