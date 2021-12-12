// This file is responsible for the game logic.

function startNewGame() {
    // check player name validation. Or operator to ensure that both player names were set.
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names!');
        return; // prevent execution of further code.
    }
    // show active player name which has the first move
    activePlayerNameElement.textContent = players[activePlayer].name;
    // make the game field visible
    gameAreaElement.style.display = 'block'; // this will display the game board when the button was clicked. But it should do that only when the names of players are valid.
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else { // if active player is not one, then switch to 0 - First player with symbol X
        activePlayer = 0;
    }
    // change the Player Name (update text shown in the span element) whenever we switched a player
    activePlayerNameElement.textContent = players[activePlayer].name // name property to store the name of player
}

function selectGameField(event) {
    // find out which field was clicked
    // add symbol of the active player
    event.target.textContent = players[activePlayer].symbol; // to dynamically access the active player index. For first turn it will be players[0] => First player
    // add disable class once a symbol was placed in the field
    event.target.classList.add('disabled'); // li.disabled in game.css file
    // switch player turn
    switchPlayer(); // execute it when game field was selected - it works, but we can change the symbol in one field more than once, which is wrong.
    // don't select already occupied field
    // keep track of all the selected fields
}