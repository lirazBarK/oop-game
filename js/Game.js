/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
let lastPhraseNum = '';
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
* Creates phrases for use in game
* @return {array} An array of phrases that could be used in the game
*/
    createPhrases() {
        const phrases = [
            'A bird in the hand is worth two in the bush',
            'The best of both worlds',
            'A piece of cake',
            'Let the cat out of the bag',
            'You cant judge a book by its cover'
        ];
        return phrases;
    }

    /**
* removing all letters from board.
* changing the buttons class back to initial state.
* Reset all of the heart images (i.e. the player's lives) in the scoreboard at the bottom of
the gameboard to display the `liveHeart.png` image.
*/
    resetDisplay() {
        const ul = document.querySelector('#phrase ul');
        const listItems = ul.querySelectorAll('li');
        listItems.forEach(listItem => ul.removeChild(listItem));

        const keyButtons = document.querySelectorAll('#qwerty button');
        keyButtons.forEach(keyButton => keyButton.className = 'key');

        const imgListItems = document.querySelectorAll("#scoreboard li");
        imgListItems.forEach(imgListItem => imgListItem.firstElementChild.src = "images/liveHeart.png");
    }


    /*drew a phrase from the array of phrases based on his index,
     if the pharse is the same as the last one it gets a diffrent one*/

    getRandomPhrase() {
        while (true) {
            const randomNum = Math.floor(Math.random() * this.phrases.length);
            if (randomNum !== lastPhraseNum) {
                lastPhraseNum = randomNum;
                return new Phrase(this.phrases[randomNum]);
            }
        }
    };

    /**
* Begins game by selecting a random phrase and displaying it to user
*/
    startGame() {
        const div = document.getElementById('overlay');
        div.style.display = 'none';
        const activePhrase = this.getRandomPhrase();
        activePhrase.addPhraseToDisplay();
        this.activePhrase = activePhrase;
    };

    //if all the letters are shown, call the gameOver function
    checkForWin() {
        const letters = document.getElementsByClassName('letter');
        const shownLetters = document.getElementsByClassName('show')
        if (letters.length === shownLetters.length) {
            return this.gameOver(true);
        }
    };

    /**
* Increases the value of the missed property
* Removes a life from the scoreboard
* Checks if player has remaining lives and ends game if player is out
*/
    removeLife() {
        this.missed += 1;
        const triesDiv = document.getElementById('scoreboard');
        const ol = triesDiv.firstElementChild;
        const li = ol.getElementsByTagName("li");
        for (let i = 0; i < li.length; i++) {
            let img = li[i].getElementsByTagName('img')[0];
            if (img.src.indexOf('liveHeart') > -1) {
                img.src = "images/lostHeart.png"
                break;
            }
        }
        if (this.missed === 5) {
            this.gameOver(false);
        }
    };

    /**
* Displays game over message
* call the resetDisplay function before the next game
*/
    gameOver(gameWon) {
        const overlayDiv = document.getElementById('overlay');
        const messageContainer = document.getElementById('game-over-message');
        if (gameWon === false) {
            messageContainer.textContent = 'Sorry, better luck next time!';
            overlayDiv.className = 'lose';
            overlayDiv.style.display = 'flex';
            this.resetDisplay();

        } else {
            messageContainer.textContent = 'Great job!';
            overlayDiv.className = 'win';
            overlayDiv.style.display = 'flex';
            this.resetDisplay();

        };
    }

    handleInteraction(button) {
        let letter = button.innerHTML;
        if (this.activePhrase.checkLetter(letter)) {
            button.className = `chosen`;
            this.activePhrase.showMatchedLetter(letter)
            if (this.checkForWin()) {
                this.gameOver(true);
            };
        } else {
            button.className = 'wrong';
            this.removeLife();
        }

    }
}