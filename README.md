# A Tic-Tac-Toe Game

### Overview

This is my attempt creating a **Tic Tac Toe**, game.


## High-level project goals:

* **Build a web application from scratch**, without a starter codebase
* Use programming skills to **map out the game logic for a simple game like Tic Tac Toe**
* **Separate HTML, CSS, and JavaScript files** in the application
* Build an application **to a spec provided by another party**
* **Build a dynamic game that allows two players to compete** (bonus: compete from separate devices)
* **Craft a ``readme.md`` file that explains this app** to the world
* **Communicate with a provided back-end** to store game state.

---

## User stories
* The user in this scenario is one (or two) players who enjoy playing Tic Tac Toe.
The features of this game development will address the following user stories.

  * As a user, I can join a Tic Tac Toe game online.

  * As a user, I can play against another player on the same computer (we can take turns).

  * As a user, I can keep track of how many games I have won.

  * As a user, I can see if I have won or have tied a game.


## Wireframe
* The initial wireframe mockup of a potential site design is located [here.](http://i.imgur.com/QiL8V6o.jpg)


## Game approach
* I leveraged my knowledge of HTML, CSS, Javascript, jQuery and AJAX to build a decently functional game

* After sketching a [wireframe](http://i.imgur.com/QiL8V6o.jpg) and reviewing my user stories (see above section), I mocked up the HTML file and added some basic CSS3 styling. Then I worked through the [game logic](http://i.imgur.com/5ErZUba.jpg) to solve the problem of recognizing user clicks on the board and changing the board piece according to game specs and requirements.

* One the logic was flushed out, I leveraged both JavaScript and jQuery to scaffold the app. Then... enter AJAX.

* I successfully connected the Tic Tac Toe API to allow the user to register, log in, create a new game (which happens if the user authorization is valid), and mark game board cell, while also storing any newly-created or partially completed games on a remote server.


## Challenges
* First: figuring out the nuances of the game logic, tackling click events, updating boxes with text values, and checking for game winner/tie outcomes. Once I got somewhat of a handle on using jQuery for DOM manipulation, I felt a bit better about that.

* Second: providing some decent separation of concerns for the code.

* Third: figuring out how the API actually worked. It took a bit to figure out what the API did, i.e., what each type of http request needed to return the appropriate data, and wha was the expected response.

* Fourth: extracting the exact data I wanted from the API, and patching data back up to the database.

* Fifth: leveraging the logic flow process I sussed out for requesting and receiving specific information from the API and actually *integrate* that into my app. [This is the process](https://www.dropbox.com/s/w05iarrdua5nkeu/Connecting-API-process-flow.pdf?dl=0) I figured out and shared with a colleague when we were discussing what the API does.

I went back and added some of that in [another mockup of my wireframe with user stories](https://www.dropbox.com/s/9d6jaxhzfbmq3se/Project01_TTT_wireframe_userStories.pdf?dl=0) populated over various sections of the app.


* As of yet, I have not been successful in making a game where users can log in from separate computers and play together.

* Another big challenge for me is actually writing out the user stories, and the README.md file, without verbosity.


## Upcoming enhancements pending issue resolution

* Improved color constrast, keyboard focusability and general accessibility improvements.

* Responsive UI layouts for various screen sizes


## Issues

* The latest build of the project is experiencing a CORS error when attempting to log in with existing accounts, and when registering new accounts. Earlier versions of the project hosted on GH pages are not experiencing this issue.


## Final Thoughts
* In general, I think this is a great project for playing with game logic, and making incremental UI improvements!

[License](LICENSE)
------------------

Source code distributed under the MIT license. Text, imagery and other assets copyright
resource11, all rights reserved.
