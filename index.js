let game;

const newGameButton = document.querySelector('.newgameButton');
const hitButton = document.querySelector('.hitButton');
const stayButton = document.querySelector('.stayButton');

const loggers = document.querySelectorAll('.blackjackLogger');
var logArea = {
    player: loggers[0],
    info: loggers[1],
    dealer: loggers[2]
}

const table = document.querySelectorAll('.handContainer');
var hands = {
    player: table[0],
    dealer: table[1]
}

const cardsDisplay = new CardsDisplay(hands);

newGameButton.addEventListener('click', function() {
    game = new Game(suits, values);
    game.startGame();
    game.initGame();
    displayNewGameButton(false);
    game.showStatus(logArea);
});

hitButton.addEventListener('click', function() {
    game.giveCard();
    game.checkForEndOfGame(logArea);
    game.showStatus(logArea);
    if (game.isGameOver) {
        displayNewGameButton(true);
    }
});

stayButton.addEventListener('click', function() {
    game.overGame();
    game.checkForEndOfGame(logArea);
    game.showStatus(logArea);
    displayNewGameButton(true);
});

function displayNewGameButton(bool) {
    if (bool === true) {
        newGameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    } else {
        newGameButton.style.display = "none";
        hitButton.style.display = "inline";
        stayButton.style.display = "inline";
    }
}