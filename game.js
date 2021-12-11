// This file is responsible for the game logic.

function startNewGame() {
    // check player name validation. Or operator to ensure that both player names were set.
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names!');
        return; // prevent execution of further code.
    }
    // make the game field visible
    gameAreaElement.style.display = 'block'; // this will display the game board when the button was clicked. But it should do that only when the names of players are valid.
}