/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = '';

document.getElementById('btn__reset').addEventListener('click', function () {
    game = new Game();
    game.startGame();

})

/**
* Handles onscreen keyboard button clicks
*/

const divs = document.querySelector('#qwerty');


divs.addEventListener('click', function (event) {

    let e = event.target;
    if (e.classList.contains('key')) {
        game.handleInteraction(e);
    }
});

const keyButtons = document.querySelectorAll('#qwerty button');

document.addEventListener('keypress', function (event) {
    let e = event.key;
    for (let i = 0; i < keyButtons.length; i++) {
        if (keyButtons[i].innerHTML === e) {
            e = keyButtons[i]
            game.handleInteraction(e);
        }
    }

});

let remainingClues = 3;
const remainingCluesContainer = document.createElement('h3');
const clueDiv = document.getElementById('clue');

remainingCluesContainer.style.display = 'inline';
remainingCluesContainer.textContent = remainingClues;
clueDiv.appendChild(remainingCluesContainer);

//when a user clicks on the "Get a clue" button a letter in the active phrase revels and the remainingClues counter decreases by one;
clueDiv.addEventListener('click', function () {
    if (remainingClues !== 0) {
        for (let i = 0; i < keyButtons.length; i++) {
            if (keyButtons[i].className === 'key' && game.activePhrase.checkLetter(keyButtons[i].innerHTML)) {
                game.handleInteraction(keyButtons[i])
                remainingClues -= 1;
                remainingCluesContainer.textContent = remainingClues;

                break;
            }
        }
    }
});

