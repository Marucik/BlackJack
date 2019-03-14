const suits = ["Hearts", "Clubs", "Spades", "Diamonds"];
const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

const buttons = [
    document.querySelector('#newgame-button'),
    document.querySelector('#hit-button'),
    document.querySelector('#stay-button')
];
const logArea = document.querySelector('#blackjack-logger');

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


function createDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {
                suit: suits[i],
                value: values[j]
            };

            deck.push(card);
        }
    }
    return deck;
}

function getNextCard() {
    return deck.shift();
}

function getCardString(card) {
    return `${card.value} of ${card.suit}`;
}

function getHandString(hand) {
    let handString = "";
    for (let i = 0; i < hand.length; i++) {
        handString += `${getCardString(hand[i])}\n`;
    }
    return handString;
}

buttons[1].style.display = "none";
buttons[2].style.display = "none";
showStatus();

buttons[0].addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    buttons[0].style.display = "none";
    buttons[1].style.display = "inline";
    buttons[2].style.display = "inline";
    showStatus();
});

buttons[1].addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

buttons[2].addEventListener('click', function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function checkForEndOfGame() {
    updateScores();

    if (gameOver) {
        while((dealerScore < playerScore) && (playerScore <= 21)) {
                dealerCards.push(getNextCard());
                updateScores();
            }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } 
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore < dealerScore) {
            playerWon = false;
        }
        else {
            playerWon = true;
        }
    }
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[swapIdx];
        deck[swapIdx] = temp;
    }
}

function getCardNumericValue(card) {
    switch (card.value) {
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        case "Ten":
        case "Jack":
        case "Queen":
        case "King":
            return 10;
    }
}

function getScore(cards) {
    let score = 0,
        hasAce = false;
    for (let i = 0; i < cards.length; i++) {
        score += getCardNumericValue(cards[i]);
        if (cards[i].value === "Ace") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        score += 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
    showHands();
}

function showHands() {
    let dealerCardString = getHandString(dealerCards),
        playerCardString = getHandString(playerCards);

    logArea.innerText = `AI has:\n ${dealerCardString}(score: ${dealerScore})\n\n
                        You have:\n ${playerCardString}(score: ${playerScore})`;
}

function showStatus() {
    if (!gameStarted) {
        logArea.innerText = "Press 'New Game!' when you're ready...";
    } else if (gameOver) {
        if (playerWon) {
            logArea.innerText += "\n\nYou were lucky...";
        } else {
            logArea.innerText += "\n\nI told you have no chance";
        }
        buttons[0].style.display = "inline";
        buttons[1].style.display = "none";
        buttons[2].style.display = "none";
    } else {
        updateScores();
    }
}

