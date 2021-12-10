// It is good to have several JS files, instead of one large file with all the logic. Different files with different responsibilities are much easier to manage and structure.

// app.js file will execute first to initialize a bunch of things, f.ex. to reach out to different HTML elements and store these elements or pointers at these elements in different JS variables or constants. In the other JS files we wanna use them which are initialized here in app.js (main entry file).

const playerConfigOverlayElement = document.getElementById('config-overlay'); // It will work, because the Event Listeners are at the bottom of app.js and the function OpenPlayerConfig can will execute only, when the EDIT button are clickable (after Event Listeners were added).
const backdropElement = document.getElementById('backdrop');

const editPlayer1BtnElement = document.getElementById('edit-player-1-btn'); // name of const should describe what will be stored by the const.
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');
const cancelConfigBtnElement = document.getElementById('cancel-config-btn');

// The buttons must be connected with click listeners to open the overlay whenever we click these EDIT buttons.
editPlayer1BtnElement.addEventListener('click', openPlayerConfig); // first value is a type of listener, second the function (defined in config.js file), that should be executed. We could add openPlayerConfig() (with parentheses) but then the function will be executed immediately when the line of code gets parsed.
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);