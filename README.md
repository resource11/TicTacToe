# A Tic-Tac-Toe Game

### Overview

This is my first attempt creating a **Tic Tac Toe**, game.


High-level project goals:

* **Build a web application from scratch**, without a starter codebase
* Use programming skills to **map out the game logic for a simple game like Tic Tac Toe**
* **Separate HTML, CSS, and JavaScript files** in the application
* Build an application **to a spec provided by another party**
* **Build a dynamic game that allows two players to compete** (bonus: compete from separate devices)
* **Craft a ``readme.md`` file that explains this app** to the world
* **Communicate with a provided back-end** to store game state.

---

##User stories
* The user in this scenario is one (or two) players who enjoy playing Tic Tac Toe.
The features of this game develepment will address the following user stories.
* As a user, I can join a Tic Tac Toe game online.
1. Conditions of satisfaction
  1. User needs to be able to register an account and login. Then, the user needs to be able to create a game and enter either an X or O on the board.
* As a user, I can play against another player on the same computer (we can take turns).
1. Conditions of satisfaction
 1.  The game board needs to be able to accept input from both users and needs to be able to change player turns so the board moves look as intended
* As a user, I can keep track of how many games I have won.
1. Conditions of satisfaction
  1. The game needs a scoring system to track wins
* As a user, I can see if I have won or have tied a game.
1. Conditions of satisfaction
  1. The game needs to somehow alert the user of game status

##Wireframe
* The initial wireframe mockup of a potential site design is located here: http://imgur.com/QiL8V6o

##Game approach
* I leveraged my knowledge of HTML, CSS, Javascript, jQuery and AJAX to build a decently functional game
* After sketching a wireframe and reviewing my user stories, I mocked up the HTML file and added some basic CSS3 styling. Then I worked through the game logic to solve the problem of recognizing user clicks on the board and changing the board piece according to game specs and requirements.
* One the logic was flushed out, I leveraged both JavaScript and jQuery to scaffold the app. Then... enter AJAX.
* I successfully connected the Tic Tac Toe API to allow the user to register, log in, create a new game (which happens if the user authorization is valid), and mark game board cell, while also storing any newly-created or partially completed games on a remote server.

##Challenges
* As of yet, I have not been successful in sending the gameOver status of a particular game to the server. I also need to test the Show Game functionality a bit more.

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text and other assets copyright
resource11, all rights reserved.
