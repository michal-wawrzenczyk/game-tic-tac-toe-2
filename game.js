// This file is responsible for the game logic.

// resetGameStatus should be called whenever we start a new game
function resetGameStatus() {
    // remove game over info
    // clear game board
    // reset data like current round and internal game field
    activePlayer = 0; // because it changes during the game
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!'; // we need the span to execute the endGame function
    gameOverElement.style.display = 'none'; // to hide the game over information

    // make all the symbols disappear from game board and reset the gameData array. Nested loop - loop through all rows and columns to looping all the items in the gameData.

    let gameFieldIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0; // to set back the gameData to the initial state

            const gameFieldItemElement = gameFieldElements[gameFieldIndex]; // because gameFieldElements is nat an array of arrays, but a single array with nine items. Helper variable is needed - gameFieldIndex.
            gameFieldItemElement.textContent = '';
            gameFieldItemElement.classList.remove('disabled');
            gameFieldIndex++; // increment by 1 after every iteration of that inner loop.
        }
    }
}

function startNewGame() {
    // check player name validation. Or operator to ensure that both player names were set.
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names!');
        return; // prevent execution of further code.
    }

    resetGameStatus();

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
    const selectedField = event.target;

    // update the selected field in the gameData array (app.js) with help of data- attribute applied to each li.
    const selectedColumn = selectedField.dataset.col - 1; // .col because data-col in HTML. -1 to achieve proper number value of array index and it also changes the result to a number.
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field!');
        return;
    } // when is > 0 we know that field has been assigned (1 or 2).

    if (gameIsOver) {
        return; // if gameIsOver is true, there is also no possible to select another field until we restart the game.
    }

    // find out which field was clicked
    // add symbol of the active player
    selectedField.textContent = players[activePlayer].symbol; // to dynamically access the active player index. For first turn it will be players[0] => First player
    // add disable class once a symbol was placed in the field
    selectedField.classList.add('disabled'); // li.disabled in game.css file

    gameData[selectedRow][selectedColumn] = activePlayer + 1; // first [] to dive into the main array and select one of the child array, second [] to select item in the child array. +1 because activePlayer by default is set to 0. We can console.log(gameData); to see how it works.
    const winnerId = checkForGameOver(); // console.log(winnerId);

    if (winnerId !== 0) { // there is a winner or draw
        endGame(winnerId);
    }

    currentRound++; // or currentRound = currentRound + 1;

    // switch player turn
    switchPlayer(); // execute it when game field was selected - it works, but we can change the symbol in one field more than once, which is wrong.
    // don't select already occupied field
    // keep track of all the selected fields
}

function checkForGameOver() {
    // check all rows and determine whether one of these rows belongs to the same player.
    for (let i = 0; i < 3; i++) { // i++ - increment the dynamic index "i" by one after every iteration (i = 0,1 or 2)
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0]; // return the winner id stored in [i][0].
        }
    }
    // check all columns or equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 && // here 0 means the first row in game board (first inner array in gameData array)
            gameData[0][i] === gameData[1][i] && // 1 means the second row 2 the third row of game board
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }
    // check the diagonal from top left to bottom right
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }
    // check the diagonal from bottom left to top right
    if (
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }
    // check for a DRAW
    if (
        currentRound === 9 // we exhausted all our rounds.
    ) {
        return -1; // -1 as a value for a DRAW
    }
    return 0; // if we still have rounds left and there is no winner yet
}

function endGame(winnerId) {
    gameIsOver = true; // we have to set it back to false when we reset the game
    gameOverElement.style.display = 'block';

    // for DRAW scenario
    if (winnerId > 0) // which means we won't have a draw, there is a winner
    {
        const winnerName = players[winnerId - 1].name; // winnerId is 1 or 2 and we need 0 or 1 to access to items in the array.
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = `It's a draw!`; // replace entire text content of h2 by the information.
    }
}