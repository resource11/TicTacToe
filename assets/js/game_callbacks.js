'use strict';


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
  $('#result').val('status: ' + error.status + ', error: ' + error.error);
  $('.player-messages').text(`Whoops! ${error.error}`);
  return;
}
  $('#result').val(JSON.stringify(data, null, 4));
  $('.player-messages').text('Registration success!');
};


// createGame callback function
var createGameCallback = function createGameCallback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' + error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    gameBoard = data.game.cells;
    gameOver = data.game.over;
    console.log('gameOver is: ' + gameOver);
    gameID = data.game.id;
    drawBoard(gameBoard);
    currPlayer = p1;
    $('.player-messages').text('New game created, game id: ' + gameID);
};


// function to draw a new board
var drawBoard = function(board){
  $(boxes).each(function(index){
    $(this).text(board[index]).fadeIn(300);
  });
};

// showGame callback function
var showGameCallback = function showGameCallback(error, data) {
  if (error) {
    console.error(error);
    $('#result').val('status: ' + error.status + ', error: ' + error.error);
    return;
  }
  $('#result').val(JSON.stringify(data, null, 4));
  gameBoard = data.game.cells;
  gameOver = data.game.over;
  console.log('gameOver is: ' + gameOver);
  gameID = data.game.id;
  drawBoard(gameBoard);
  currPlayer = p1;
  $('.player-messages').text('Game loaded, game ID: ' + gameID);
};


var markCellCallback = function markCellCallback(err, data) {
  if(err) {
    return console.error(err);
  }
  $('#result').val(JSON.stringify(data, null, 4));
};


var joinGameCallback;

var updateGameCallback;

var watchGameCallback;
