// It is good to have several JS files, instead of one large file with all the logic. Different files with different responsibilities are much easier to manage and structure.
// app.js file will execute first to initialize a bunch of things, f.ex. to reach out to different HTML elements and store these elements or pointers at these elements in different JS variables or constants. In the other JS files we want to use them which are initialized here in app.js (main entry file).

const gameData = [
    [0, 0, 0], // 0 to signal that this field has not been selected by any player. 1 will be for first player, 2 for the second.
    [0, 0, 0],
    [0, 0, 0],
];


let editedPlayer = 0; // not const, because the value stored in there will be changing
let activePlayer = 0; // to access the first player symbol (X) initially in function selectGameField and then change it in every turn.
let currentRound = 1; // to check if there is a DRAW. 1 because we start in round number 1.

// the players array should be updated whenever a name was entered for them.
const players = [
    {
        name: '', // initially is empty, but it must be set before the game start.
        symbol: 'X' // unchangeable
    },
    {
        name: '',
        symbol: 'O'
    },
]; // an array with two objects with name property

const playerConfigOverlayElement = document.getElementById('config-overlay'); // It will work, because the Event Listeners are at the bottom of app.js and the function OpenPlayerConfig can will execute only, when the EDIT button are clickable (after Event Listeners were added).
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form'); // select the first <form> element on the page.
const errorsOutputElement = document.getElementById('config-errors'); // to show error message set in config.js
const gameAreaElement = document.getElementById('active-game');
const activePlayerNameElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over'); // id assigned to the article

// BUTTONS access
const editPlayer1BtnElement = document.getElementById('edit-player-1-btn'); // name of const should describe what will be stored by the const.
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');
const cancelConfigBtnElement = document.getElementById('cancel-config-btn');
const startGameBtnElement = document.getElementById('start-game-btn');
const gameFieldElements = document.querySelectorAll('#game-board li'); // querySelectorAll to select more than one element. It will return an array full of these fitting elements.

// The buttons must be connected with click listeners to open the overlay whenever we click these EDIT buttons.
editPlayer1BtnElement.addEventListener('click', openPlayerConfig); // first value is a type of listener, second the function (defined in config.js file), that should be executed. We could add openPlayerConfig() (with parentheses) but then the function will be executed immediately when the line of code gets parsed.
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig); // built-in event in the browser available in JS.

startGameBtnElement.addEventListener('click', startNewGame);

for (const gameFieldElement of gameFieldElements) {
    // code for every single item in that array
    gameFieldElement.addEventListener('click', selectGameField);
}