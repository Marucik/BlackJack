class Game {
  constructor(suits, values){
    this._gameStarted = false;
    this._gameOver = false;
    this._playerWon = false;
    this._dealerCards = [];
    this._playerCards = [];
    this._dealerScore = 0;
    this._playerScore = 0;
    this._deck = this._createDeck(suits, values)
  }

  initGame() {
    this._dealerCards = [this._nextCard(), this._nextCard()];
    this._playerCards = [this._nextCard(), this._nextCard()];
  }

  overGame() {
    this._gameOver = true;
  }

  giveCard() {
    this._playerCards.push(this._nextCard());
  }

  _nextCard() {
    return this._deck.shift()
  }

  _getCardString(card) {
    return `${card.value} of ${card.suit}`;
  }

  _getHandString(hand) {
    let handString = "";
    for (let i = 0; i < hand.length; i++) {
      handString += `${this._getCardString(hand[i])}\n`;
    }
    return handString;
  }

  _getCardNumericValue(card) {
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

  _getScore(cards) {
    let score = 0,
      hasAce = false;
    for (let i = 0; i < cards.length; i++) {
      score += this._getCardNumericValue(cards[i]);
      if (cards[i].value === "Ace") {
        hasAce = true;
      }
    }
    if (hasAce && score + 10 <= 21) {
      score += 10;
    }
    return score;
  }

  _updateScores(logger) {
    this._dealerScore = this._getScore(this._dealerCards);
    this._playerScore = this._getScore(this._playerCards);
    this._showHands(logger);
  }

  _showHands(logger) {
    let dealerCardString = this._getHandString(this._dealerCards),
        playerCardString = this._getHandString(this._playerCards);

    logger.innerText = `AI has:\n ${dealerCardString}(score: ${this._dealerScore})\n\n
                        You have:\n ${playerCardString}(score: ${this._playerScore})`;
  }

  startGame() {
    this._gameStarted = true;
    this._gameOver = false;
    this._playerWon = false;
  }

  showStatus(logger) {
    if (!this._gameStarted) {
      logger.innerText = "Press 'New Game!' when you're ready...";
    } else if (this._gameOver) {
      if (this._playerWon) {
        logger.innerText += "\n\nYou were lucky...";
      } else {
        logger.innerText += "\n\nI told you have no chance";
      }
    } else {
      this._updateScores(logger);
    }
  }

  checkForEndOfGame(logger) {
    this._updateScores(logger);

    if (this._gameOver) {
      while (this._dealerScore < this._playerScore
        && this._playerScore <= 21) {
        this._dealerCards.push(this._nextCard());
        this._updateScores(logger);
      }
    }

    if (this._playerScore > 21) {
      this._playerWon = false;
      this._gameOver = true;
    }
    else if (this._dealerScore > 21) {
      this._playerWon = true;
      this._gameOver = true;
    }
    else if (this._gameOver) {
      if (this._playerScore < this._dealerScore) {
        this._playerWon = false;
      }
      else {
        this._playerWon = true;
      }
    }
  }

  _createDeck(suits, values) {
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

    for (let i = 0; i < deck.length; i++) {
      let swapIdx = Math.trunc(Math.random() * deck.length);
      let temp = deck[i];
      deck[i] = deck[swapIdx];
      deck[swapIdx] = temp;
    }

    return deck;
  };
}