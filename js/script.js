// begin scripts

'use strict';

$(document).ready(function() {

// finds each box in the grid
  var winner = null;
  var boxGrid = $('#tic-tac-holder').children();
  var box = $('.box');

  var player01 = 'X';
  var player02 = 'O';
  var player = player01;

// play the game

// check for winner test
// var getWinner = function getWinner() {
//     if (winnerIs('X')) {
//     console.log('X');
//     return 'The winner is X';
//   }
//   else if (winnerIs('O')) {
//     console.log('O');
//     return 'The winner is O';
//   } else {
//     return null;
//   }
// };

// var winnerIs = function winnerIs(player) {
//   return winsRow(player) || winsColumn(player) || winsDiagonal(player);
// };

// var winsRow = function winsRow(player) {
//   return allThree(player, boxGrid[0], boxGrid[1], boxGrid[2]) ||
//          allThree(player, boxGrid[3], boxGrid[4], boxGrid[5]) ||
//          allThree(player, boxGrid[6], boxGrid[7], boxGrid[8]);
// };

// var winsColumn = function winsColumn(player) {
//   return allThree(player, boxGrid[0], boxGrid[3], boxGrid[6]) ||
//          allThree(player, boxGrid[1], boxGrid[4], boxGrid[7]) ||
//          allThree(player, boxGrid[2], boxGrid[5], boxGrid[8]);
// };

// var winsDiagonal = function winsDiagonal(player) {
//   return allThree(player, boxGrid[0], boxGrid[4], boxGrid[8]) ||
//          allThree(player, boxGrid[2], boxGrid[4], boxGrid[6]);
// };

// var allThree = function allThree(player, boxOne, boxTwo, boxThree) {
//   return (boxOne === player) && (boxTwo === player) && (boxThree === player);
// };


// check for winner long way
var checkForWinner = function checkForWinner() {
  if (
  $(boxGrid[0]).text() && $(boxGrid[1]).text() && $(boxGrid[2]).text() === 'X' ||
  $(boxGrid[3]).text() && $(boxGrid[4]).text() && $(boxGrid[5]).text() === 'X' ||
  $(boxGrid[6]).text() && $(boxGrid[7]).text() && $(boxGrid[8]).text() === 'X' ||
  $(boxGrid[0]).text() && $(boxGrid[3]).text() && $(boxGrid[6]).text() === 'X' ||
  $(boxGrid[1]).text() && $(boxGrid[4]).text() && $(boxGrid[7]).text() === 'X' ||
  $(boxGrid[2]).text() && $(boxGrid[5]).text() && $(boxGrid[8]).text() === 'X' ||
  $(boxGrid[0]).text() && $(boxGrid[4]).text() && $(boxGrid[8]).text() === 'X' ||
  $(boxGrid[2]).text() && $(boxGrid[4]).text() && $(boxGrid[6]).text() === 'X')

  { winner = 'x';
    console.log('winner is x'); } // else if (

  // $(boxGrid[0]).text() && $(boxGrid[1]).text() && $(boxGrid[2]).text() === 'O' ||
  // $(boxGrid[3]).text() && $(boxGrid[4]).text() && $(boxGrid[5]).text() === 'O' ||
  // $(boxGrid[6]).text() && $(boxGrid[7]).text() && $(boxGrid[8]).text() === 'O' ||
  // $(boxGrid[0]).text() && $(boxGrid[3]).text() && $(boxGrid[6]).text() === 'O' ||
  // $(boxGrid[1]).text() && $(boxGrid[4]).text() && $(boxGrid[7]).text() === 'O' ||
  // $(boxGrid[2]).text() && $(boxGrid[5]).text() && $(boxGrid[8]).text() === 'O' ||
  // $(boxGrid[0]).text() && $(boxGrid[4]).text() && $(boxGrid[8]).text() === 'O' ||
  // $(boxGrid[2]).text() && $(boxGrid[4]).text() && $(boxGrid[6]).text() === 'O')

  // {
  //   winner = 'o';
  //   console.log('winner is o');
  // }


  // var winnerX = 'XXX';
  // var winnerO = 'OOO';

  // console.log('running test');
  // var k = 0;
  // var combo = '---';

  // for (var i = 0; i < winCombo.length; i++) {
  //   combo = winCombo[i];
  //   console.log($(combo[i]).text());
  // }
  // if ((combo[0]+combo[1]+combo[2]) === 'XXX') {
  //   console.log('winner is X');
  // }
  // if ((combo[0]+combo[1]+combo[2]) === 'OOO') {
  //   console.log('winner is O');
  // }


  // for (var k in winCombo) {
  //   var combo = winCombo[k];
  //   console.log(winCombo[k]);
  // }

};


// check for no dashes in board boxes
// var isNotBlank = function isNotBlank(element, index, array) {
//       return element !== '-';
// }

// var checkForBlanks = function checkForBlanks() {
//   return boxGrid.every(isNotBlank);
// }

// check for full board with no winner
// var fullBoard = function fullBoard() {
//   // if (!winnerIs('X') || !winnerIs('O') || checkForBlanks) {
//     // console.log($(boxGrid).text());
//     for (var i = 0; i < boxGrid.length; i++) {
//       if (boxGrid[i] !== '-') {

//       }
//     // }
//     console.log('full board, no winner');
//     console.log($(boxGrid).text());
//   }
// };
 var checkForBlanks = function checkForBlanks() {
  var boxCount = 0;
  var i = 0;
  for (i in this.boxGrid) {
    if (boxGrid[i] !== '-') {
      boxCount += 1;
    }

    if (boxCount === 9) {
      return 'Cat\'s game';
    }
  }
};




// if playerTurn is player01
//   when player01 clicks a box, the box is changed to x
// if playerTurn is player02
//   when player02 clicks a box, the box is changed to o

  $(box).on('click', function() {
    if (player === player01 ){
          $(this).text('X');
          console.log(boxGrid.text());
          // checkForBlanks();
          checkForWinner();
          player = player02;
      } else {
          $(this).text('O');
          console.log(boxGrid.text());
          // checkForBlanks();
          checkForWinner();
          player = player01;
      }
  });

// this only wored when I just targeted the .reset-game class
  $('.reset-game').on('click', function() {
    // reset each square
    $(boxGrid).text('-');
    player = player01;
  });

});

// end scripts





