// This file is responsible for all the logic related to configuring players. It should open and close the overlay and take the user input, validate and store it. First the file where we define something (f.ex. function) must be executed in the browser and then in a second step should be executed the file where we use that thing (f.ex. function).

// for EDIT buttons - we want to change style of the overlay and backdrop. Display: none; change to Display: block.
// When the modal is open, then we know that one of the EDIT buttons was clicked. We can get access to those buttons with help of event object.
function openPlayerConfig(event) {
    // editPlayer to store the ID of the player which is edited in this editPlayer variable.
    editedPlayer = +event.target.dataset.playerid; // gives access to the element for which the event occurred - in this case to the Edit button. "dataset" property exists in every HTML element. This object will be populated with all the data attributes added to HTML element. If player-id, then dataset['player-id']. Now we can store the information to know which player we're currently editing. Here we are overriding the variable created in app.js. It can hold either a value of 1 or 2. "+" to convert a string value to a number. +'1' => 1
    playerConfigOverlayElement.style.display = 'block';
    backdropElement.style.display = 'block';
}
// we also want to close the overlay by clicking on CANCEL button or on the backdrop. We need to add more click listeners.

// for CANCEL overlay button - after click on this button, the overlay and backdrop must disappear. Display: block; to Display: none;
function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none';
    backdropElement.style.display = 'none';
    formElement.firstElementChild.classList.remove('error'); // to get rid of the additional "error" class, which styles the input when wrong player name was entered.
    // to clear the input we can change the "button" value of type attribute of Cancel button to "reset" value.
    errorsOutputElement.textContent = ''; // to get rid of the error message.
    formElement.firstElementChild.lastElementChild.value = ''; // lastElementChild is the input. Set to empty string to reset what's entered in there. getElementById would be more secure way to do this. Without this function after we enter the name and click on backdrop, it does not reset. Now it will disappear when we click on backdrop.
}

// here we want to get the entered value and briefly validate it and check it, but most importantly - prevent the default behaviour of the browser (send HTTP a request to a server - in this case to our development server) and browser tries to send the date there - that is why this page reloads after click Confirm. The server does not exist, so it must be handled with JS. An "event" object can help to prevent such situation - it describes the executed event automatically.
function savePlayerConfig(event) {
    event.preventDefault(); // preventDefault method allows to handle that form submission in JS instead of sending request by browser
    // console.log(event); // to see what's inside it (should be also preventDefault method)
    const formData = new FormData(event.target); // this constant holds an object {} (can be created using the "new" keyword) and then use the FormData built-in blueprint function - it takes a form (a pointer at a form HTML element and will automatically extract values entered into inputs for us. "event" object has a "target" property that points on the HTMl element responsible fot this event. JS will analyze this <form> and will automatically look for inputs in there but only those that have a "name" attribute and thanks to that we have access to the input value.
    const enteredPlayername = formData.get('playername').trim(); // "get" method of formData object allows us to get a value of one of our inputs.
    // now we have hold of what the user entered. We can console.log it. "trim" is a built-in method - it trims excess white space. It deletes empty spaces in front or after, but not between words.
    if (!enteredPlayername) { // alternatively enteredPlayerName === '' (empty string) - empty string is considered as a falsy value in JS. So if enteredPlayerName is NOT true (is falsy), so it is an empty string, then the code must be executed.
        event.target.firstElementChild.classList.add('error'); // the <form> element is stored in event.target. We want to get access to the first <div> of <form>. classList.add() adds new class to the <div> element.
        errorsOutputElement.textContent = 'Please enter a valid name!';
        return; // to stop the execution of the function in which we call it so next functions will not be executed. If there is an error, we don't want to execute any other code in this function.
    }
    // if there is a valid player name
    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data'); // dynamically selected player article by concatenate operation using editedPlayer, which is 1 or 2 as a number, but it will be changed to string automatically by JS.
    updatedPlayerDataElement.children[1].textContent = enteredPlayername; // to update the h3 element - to show player name. For this moment we can enter the player name and we can see it in h3 element, but we must close the overlay by clicking Cancel - because Confirm does not work yet. We also want to store the enteredPlayername internally in JS code, not just in h3 element. We need it to show the winner.

    // to check which player we are currently editing we can calculate this index dynamically - since editedPlayer is 1 or 2, and index of object in the array is 0 for player 1 and 1 for player 2. This allows to store the player name data internally.
    players[editedPlayer - 1].name = enteredPlayername;
    // to close the modal manually by click confirm button if we did update the player data. Here the parentheses must be - we execute the function manually.
    closePlayerConfig(); // explicitly execute this function by myself, if we are done submitting the form. The function is called by myself.
}