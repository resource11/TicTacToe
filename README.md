# A Tic-Tac-Toe Game

### Overview

This is my first attempt creating a **Tic Tac Toe**, game.


##High-level project goals:

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
The features of this game development will address the following user stories.
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
* My first challenge was figuring out the nuances of the game logic, and tackling how the board would receive clicks, update boxes with text values, and then check for winner and tie. Much different than creating game logic and returning results in a console. Once I got somewhat of a handle on using jQuery for DOM manipulation, I felt a bit better about that.
* My second challenge was structuring my code in a way that could more easily integrate the ajax requests/response (still learning proper terminology here). I believe I already had it done pretty cleanly for someone who is new to JS. 
* My third challenge was figuring out how the API actually worked. It took a long time to figure out what the API did. I really got mired in looking at Antony's api code and getting derailed a bit when trying to figure out what the methods actually did (what the http request was asking for, what the http response was giving back). Once I looked at the rails-ttt-project-api documentation closely, I was able to glean a bit more clearly the structure of the information the database wants to receive and/or will send as a response.
* My fourth challenge was to figure out how to get the exact data I wanted from the API, and patch data back up to the database. Eventually, I figured that out. Sort of.
* My fifth challenge was trying to use the process I sussed out with respect to the steps needed to request and receive specific information from the API and actually *integrate* that into my app. This is the process I figured out, and shared with Meng. I stayed stuck here for a good day, and he rocked it/figured out how to use that info to integrate the API into his Tic Tac Toe excellence. That is encouraging, because it's nice to see that somehow the steps I wrote down actually were a valid process! Here is a look at that process. When I look at it now, it almost looks like conditions of satisfaction of a user story. I went back and added some of that in another mockup of my wireframe with user stories populated over various sections of the app. You can look at that here.
* My sixth challenge was getting stuck on getting the markCell click handler to work. I had it working on Wednesday night, committed changes and pushed to my repo. Thursday, I couldn't get that handler to work. Or at least, show me in my results box that it was actually working. Until Thursday very late in the evening. Not sure if user error or if a factor of the 504 errors. It was a bit of an unfortunate glitch, considering I was really excited to reach for a multiplayer experience. From a right-brain perspective I *am* glad I took a few hours at the very end to add some visual styling after the project deliverable requirements were met.
* As of yet, I have not been successful in patching the gameOver status of a particular game to the server. I also need to test the Show Game functionality a bit more. Again, couldn't tell if it was user error, or a server issue, considering the amount of times I was receiving a 504 errror when attempting to test.
* Additionally, the 'reset game' button did not leverage the 'create game' button functionality into that particular click event handler at the time --- it simply cleared the local state of the board. The 'reset game' button was one of my stretch goals, so, I'm OK with not solving it for the deliverable timeframe.
* Another big challenge for me is actually writing out the user stories, and the README.md file, without creating an extremely verbose description of every single thought or process I planned. Brevity in writing: not my bag.

##Final Thoughts
* In general, I think this is a great first project for showing how much we have learned in the past three weeks!

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text and other assets copyright
resource11, all rights reserved.
