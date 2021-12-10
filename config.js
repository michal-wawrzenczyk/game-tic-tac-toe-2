// This file is responsible for all the logic related to configuring players. It should open and close the overlay and take the user input, validate and store it. First the file where we define something (f.ex. function) must be executed in the browser and then in a second step should be executed the file where we use that thing (f.ex. function).

// for EDIT buttons - we want to change style of the overlay and backdrop. Display: none; change to Display: block;
function openPlayerConfig() {
    playerConfigOverlayElement.style.display = 'block';
    backdropElement.style.display = 'block';
}
// we also want to close the overlay by clicking on CANCEL button or on the backdrop. We need to add more click listeners.

// for CANCEL overlay button - after click on this button, the overlay and backdrop must disappear. Display: block; to Display: none;
function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none';
    backdropElement.style.display = 'none';
}