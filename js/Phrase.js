/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
* Display phrase on game board
*/
    addPhraseToDisplay() {
        const characters = [...this.phrase];
        const gameBoard = document.getElementById('phrase');
        characters.forEach(char => {
            const li = document.createElement('li');
            if (char === ' ') {
                li.className = 'hide space'
            } else {
                li.className = `hide letter ${char}`;
                li.textContent = char;
            }
            gameBoard.firstElementChild.appendChild(li);

        });
    }

    /**
* Checks if passed letter is in phrase
* @param (string) letter - Letter to check
*/
    checkLetter(letter) {
        if (this.phrase.indexOf(letter) > -1) {
            return true;
        } else {
            return false;
        }
    };

    /**
* Displays passed letter on screen after a match is found
* @param (string) letter - Letter to display
*/
    showMatchedLetter(letter) {
        const gameBoard = document.getElementById('phrase');
        const ul = gameBoard.firstElementChild;
        const li = ul.getElementsByTagName("li");
        for (let i = 0; i < li.length; i++) {
            if (li[i].textContent === letter) {
                li[i].className = `show letter ${li[i]}`;
            }
        }
        
    };
}