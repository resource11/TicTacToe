// begin scripts

'use strict';

$(document).ready(function() {

// finds each box in the grid
  var boxGrid = $('#tic-tac-holder').children();
  var box = $('.box');

  var player01 = 'X';
  var player02 = 'O';
  var player = player01;

// play the game

// check for winner
var getWinner = function getWinner() {
  if (winnerIs('X')) {
    console.log('X');
    return 'The winner is X';
  }
  else if (winnerIs('O')) {
    console.log('O');
    return 'The winner is O';
  } else if (fullBoard()) {
    return 'Cat\'s game';
  } else {
    return null;
  }
}

var winnerIs = function winnerIs(player) {
  return winsRow(player) || winsColumn(player) || winsDiagonal(player);
}

var winsRow = function winsRow(player) {
  return allThree(player, boxGrid[0], boxGrid[1], boxGrid[2]) ||
         allThree(player, boxGrid[3], boxGrid[4], boxGrid[5]) ||
         allThree(player, boxGrid[6], boxGrid[7], boxGrid[8]);
}

var winsColumn = function winsColumn(player) {
  return allThree(player, boxGrid[0], boxGrid[3], boxGrid[6]) ||
         allThree(player, boxGrid[1], boxGrid[4], boxGrid[7]) ||
         allThree(player, boxGrid[2], boxGrid[5], boxGrid[8]);
}

var winsDiagonal = function winsDiagonal(player) {
  return allThree(player, boxGrid[0], boxGrid[4], boxGrid[8]) ||
         allThree(player, boxGrid[2], boxGrid[4], boxGrid[6]);
}

var allThree = function allThree(player, boxOne, boxTwo, boxThree) {
  return (boxOne === player) && (boxTwo === player) && (boxThree === player);
}

// check for full board with no winner
var fullBoard = function fullBoard() {
  if (!winnerIs('X') && !winnerIs('O') && ($(boxGrid).text() !== '---------')) {
    // console.log($(boxGrid).text());
    console.log('full board, no winner');
    console.log($(boxGrid).text());
  }
};


// if playerTurn is player01
//   when player01 clicks a box, the box is changed to x
// if playerTurn is player02
//   when player02 clicks a box, the box is changed to o

  $(box).on('click', function() {
    if (player === player01 ){
          $(this).text('X');
           getWinner($(this));
          player = player02;
      } else {
          $(this).text('O');
          getWinner($(this));
          player = player01;
      }
  });

// this only wored when I just targeted the .reset-game class
  $('.reset-game').on('click', function() {
    // reset each square
    $(boxGrid).text('-');
    player = player01;
  });

  fullBoard();


});

// end scripts





// 'use strict';

// var init = function init() {
//   var yourName = prompt('What is your name?');

//   document.getElementById('name').textContent = yourName;

//   var thingList = document.getElementById('fav-list');
//   var newThingButton = document.getElementById('new-thing-button');
//   var checkbox = document.getElementById('click-handler-box');
//   var closeListButton = document.getElementById('close-list-button');

//   var newThingButtonClickHandler = function newThingButtonClick(event) {
//     event.preventDefault();
//     MyApp.addToList(thingList);
//   };

//   var closeListButtonClickHandler = function closeListButtonClick(event) {
//     newThingButton.disabled = !newThingButton.disabled;
//     console.log(newThingButton.disabled);
//     event.target.textContent = event.target.textContent === "No more things" ?
//       "More things" :
//       "No more things";
//   };

//   var liClickHandler = function liClick(event) {
//     var text = event.target.textContent;
//     alert(text);
//   };

//   var checkboxChangeHandler = function checkboxChange(event) {
//     var listElements = thingList.children;
//     // create varliable 'numListElements' and assign to it
//     // the number of child elelments of our <ul> with id 'fav-list'
//     var numListElements = thingList.childElementCount;

//     if(event.target.checked) { // if the checkbox is checked
//       //loop ove the length of the 'listElements' array
//       for(var index=0; index < numListElements; index++) {
//         // attach a click handler on each ,li> element in our <ul>
//         listElements[index].addEventListener('click', liClickHandler);
//       }
//     } else { // if the checkbox is unchecked
//       // loop over the length of the 'listElements' array
//       for(var index=0; index < numListElements; index++) {
//         // remove the specific click handler we set
//         // on each <li> in our <ul>
//         listElements[index].removeEventListener('click', liClickHandler);
//       }
//     }
//   };

//   newThingButton.addEventListener('click', newThingButtonClickHandler);
//   closeListButton.addEventListener('click', closeListButtonClickHandler);
//   checkbox.addEventListener('change', checkboxChangeHandler);
// };

// window.addEventListener('load', init);

// // We can define things outside of the window.onload which are evaluated
// // // only when called.
// var MyApp = {};

// MyApp.addToList = function(list) {
//   var newLi = document.createElement('li');
//   var newItemText = document.getElementById('new-thing');
//   newLi.textContent = newItemText.value;
//   newItemText.value = '';
//   if (newLi.textContent !== '') {
//     list.appendChild(newLi);
//   }
// };

