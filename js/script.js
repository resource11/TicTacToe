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



// check for winner long way
var checkForWinner = function checkForWinner(player) {
  if (
  $(boxGrid[0]).text()  === player && $(boxGrid[1]).text()  === player && $(boxGrid[2]).text() === player ||
  $(boxGrid[3]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[5]).text() === player ||
  $(boxGrid[6]).text()  === player && $(boxGrid[7]).text()  === player && $(boxGrid[8]).text() === player ||
  $(boxGrid[0]).text()  === player && $(boxGrid[3]).text()  === player && $(boxGrid[6]).text() === player ||
  $(boxGrid[1]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[7]).text() === player ||
  $(boxGrid[2]).text()  === player && $(boxGrid[5]).text()  === player && $(boxGrid[8]).text() === player ||
  $(boxGrid[0]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[8]).text() === player ||
  $(boxGrid[2]).text()  === player && $(boxGrid[4]).text()  === player && $(boxGrid[6]).text() === player)

  { winner = player;
    console.log('Winner is ' + player); } else if (checkForBlanks()) {
      console.log('the cat has it');
    }

};

// check for Cat's Game
 var checkForBlanks = function checkForBlanks() {
  var boxCount = 0;
  boxGrid.each(function() {
    if ($(this).text() !== '-') {
      boxCount += 1;
    }
  });
  if (boxCount === 9) {
      console.log('cat game');
      return 'Cat\'s game';
    }
};


// if playerTurn is player01
//   when player01 clicks a box, the box is changed to x
// if playerTurn is player02
//   when player02 clicks a box, the box is changed to o

// use piece/player function here
  $(box).on('click', function() {

    if (player === player01) {
          $(this).text('X');
          console.log(boxGrid.text());
          // $(this).attr('disabled', 'true');
          // console.log($(this).text());
          // $(this).prop('disabled', true);
          // $(this).prop('disabled', false);
          // checkForBlanks();
          checkForWinner(player);
          player = player02;
      } else {
          $(this).text('O');
          // console.log(boxGrid.text());
          // $(this).attr('disabled');
          // $(this).off('click');
          // checkForBlanks();
          checkForWinner();
          player = player01;
      }

  });

// this only wored when I just targeted the .reset-game class
  $('.reset-game').on('click', function() {
    // reset each square
    $(boxGrid).text('-');
    // if ( $(box).attr('disabled') == "disabled" ) {
    //     return false;
    //   }
    //   else {
          // $(boxGrid).bind('click');
      // }
    // $(boxGrid).on('click').find(box);
    player = player01;
  });

});

// end $(document).ready(function())


// $( "#bind" ).click(function() {
//   $( "body" )
//     .on( "click", "#theone", flash )
//     .find( "#theone" )
//       .text( "Can Click!" );
// });
// $( "#unbind" ).click(function() {
//   $( "body" )
//     .off( "click", "#theone", flash )
//     .find( "#theone" )
//       .text( "Does nothing..." );
// });


// $("#file-button").click(function() {
//       if ( $('#file-button').attr('disabled') == "disabled" ) {
//         return false;
//       }
//       else {
//           $('#file').trigger('click');
//       }
//     });


// wrap game piece/player choice function
// var playerSelectsBox = function (player, player01, player02) {
//   if (player === player01 ){
//           $(this).text('X');
//           console.log(boxGrid.text());
//           $(this).off('click');
//           // console.log($(this).text());
//           // $(this).prop('disabled', true);
//           // $(this).prop('disabled', false);
//           checkForBlanks();
//           checkForWinner();
//           player = player02;
//       } else {
//           $(this).text('O');
//           console.log(boxGrid.text());
//           $(this).off('click');
//           checkForBlanks();
//           checkForWinner();
//           player = player01;
//       }
// }





