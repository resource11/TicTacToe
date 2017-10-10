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
  $('#result').val(`status: ${error.status}, error: ${error.error}`);
  $('.player-messages').text(`Whoops! ${error.error}`);
  return;
}
  $('#result').val(JSON.stringify(data, null, 4));
  $('.player-messages').text(`Registration success!`);
  $('#API-signon__dialog').fadeOut();
  $('#API-signon__dialog').addClass('hidden');
  $('.container').removeClass('hidden');
};


// createGame callback function
var createGameCallback = function createGameCallback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val(`status: ${error.status}, error: ${error.error}`);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    gameBoard = data.game.cells;
    gameOver = data.game.over;
    console.log('gameOver is: ' + gameOver);
    gameID = data.game.id;
    drawBoard(gameBoard);
    currPlayer = p1;
    $('.player-messages').text(`New game created, game id: ${gameID}`);
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
    $('#result').val(`status: ${error.status}, error: ${error.error}`);
    return;
  }
  $('#result').val(JSON.stringify(data, null, 4));
  gameBoard = data.game.cells;
  gameOver = data.game.over;
  console.log('gameOver is: ' + gameOver);
  gameID = data.game.id;
  drawBoard(gameBoard);
  currPlayer = p1;
  $('.player-messages').text(`Game loaded, game #: ${gameID}`);
};


// listGames callback function
var listGamesCallback = function listGamesCallback(error, data) {
  if (error) {
    console.error(error);
    $('#result').val(`status: ${error.status}, error: ${error.error}`);
    return;
  }

  $('#result').val(JSON.stringify(data, null, 4));

  // grab game ids from object, populate into listitems
  const gamesList = data.games;
  const gamesIDlist = Object.values(gamesList);
  const mappedIDs = gamesIDlist.map(gamesIDlist => (
    `<li class='games-listitems'>
      <span>Game ${gamesIDlist.id}</span>
      <button data-game='${gamesIDlist.id}' class='btn-shape btn__show-game' aria-label='Show Game ${gamesIDlist.id}'>Show</button>
    </li>`
    )).join('');

  // display list into DOM
  const listOfGames = document.getElementById('games-list');
  listOfGames.innerHTML = mappedIDs;

  // find the buttons in DOM, add click handlers to each
  const showGames = listOfGames.querySelectorAll('button');
  showGames.forEach(function(showGame){
    showGame.addEventListener('click', function() {
      const id = showGame.dataset.game;
      tttapi.showGame(id, userToken, showGameCallback);
    });
  });
  $('.container').fadeIn();
  $('.container').removeClass('hidden');
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
