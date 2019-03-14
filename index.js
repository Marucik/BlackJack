const suits = ["Hearts", "Clubs", "Spades", "Diamonds"];
const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
let game;

let newGameButton = document.querySelector('#newgame-button');
let hitButton = document.querySelector('#hit-button');
let stayButton = document.querySelector('#stay-button');

let logArea = document.querySelector('#blackjack-logger');

newGameButton.addEventListener('click', function() {
    game = new Game(suits, values);
    game.startGame();
    game.initGame();
    displayNewGame(false);
    game.showStatus(logArea);
});

hitButton.addEventListener('click', function() {
    game.giveCard();
    game.checkForEndOfGame(logArea);
    game.showStatus(logArea);
});

stayButton.addEventListener('click', function() {
    game.overGame();
    game.checkForEndOfGame(logArea);
    game.showStatus(logArea);
    displayNewGame(true);
});

function displayNewGame(bool) {
    if(bool === true) {
        newGameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    } else {
        newGameButton.style.display = "none";
        hitButton.style.display = "inline";
        stayButton.style.display = "inline";
    }
}