'use strict';

$(document).ready(function() {

// finds each box in the grid
var boxGrid = $('#tic-tac-holder').children();


var box = $('.box');

var player01 = 0;
var player02 = 1;
var playerTurn = player01;

// if playerTurn is player01
//   when player01 clicks a box, the box is changed to x
// if playerTurn is player02
//   when player02 clicks a box, the box is changed to o

$(box).on('click', function() {
  if (playerTurn === player01 ){
        $(this).text('X');
        playerTurn = player02;
    } else {
        $(this).text('O');
        playerTurn = player01;
    }
});


});


function getWinner() {
  if (winnerIs('x')) {
    return 'X';
  }
  if (winnerIs('o')) {
    return 'O';
  }
  return null;
}

function winnerIs(player) {
  return winsRow(player) || winsColumn(player) || winsDiagonal(player);
}

function winsRow(player) {
  return allThree(player, cells('a'), cells('b'), cells('c')) ||
         allThree(player, cells('d'), cells('e'), cells('f')) ||
         allThree(player, cells('g'), cells('h'), cells('i'));
}

function winsColumn(player) {
  return allThree(player, cells('a'), cells('d'), cells('g')) ||
         allThree(player, cells('b'), cells('e'), cells('h')) ||
         allThree(player, cells('c'), cells('f'), cells('i'));
}

function winsDiagonal(player) {
  return allThree(player, cells('a'), cells('e'), cells('i')) ||
         allThree(player, cells('c'), cells('e'), cells('g'));
}

function allThree(player, cellOne, cellTwo, cellThree) {
  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
}


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
//         // remove the specific click khandler we set
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

