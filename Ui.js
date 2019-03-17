class CardsDisplay {
  constructor(hands) {
    this._playerHand = hands.player;
    this._dealerHand = hands.dealer;
  }

  _clearTable() {
    this._playerHand.innerHTML = " ";
    this._dealerHand.innerHTML = " ";
  }

  renderSingleCard(player, card) {
    if (player === 'player') {
      this._updateSingleCard(card, this._playerHand);
    } else {
      this._updateSingleCard(card, this._dealerHand);
    }
  }

  renderCards(player, dealer) {
    this._clearTable();
    this._updateHand(player, this._playerHand);
    this._updateHand(dealer, this._dealerHand);
  }

  _updateSingleCard(newCard, hand) {
    let singleCard;
    if (Array.isArray(newCard) === true) {
      singleCard = newCard[0];
    } else {
      singleCard = newCard;
    }
    let suite = this._newElement("img", "suite", null);
    let suiteImg = document.createAttribute("src");
    suiteImg.value = singleCard.img;
    suite.setAttributeNode(suiteImg);

    let cardValue = this._newElement("p", "cardValue", singleCard.shortName);
    let cardContainer = this._newElement("div", "cardContainer", null);
    let card = this._newElement("div", "card", null);
    cardContainer.appendChild(suite);
    cardContainer.appendChild(cardValue);
    card.appendChild(cardContainer);

    card.classList.add('swipeCard');
        
    let cardsArray = hand.querySelectorAll('.card');
    let lastCard = cardsArray[cardsArray.length - 1]
    lastCard.appendChild(card);
    
  }

  _updateHand(cards, hand) {
    for (let i = 0; i < cards.length; i++) {
      let suite = this._newElement("img", "suite", null);
      let suiteImg = document.createAttribute("src");
      suiteImg.value = cards[i].img;
      suite.setAttributeNode(suiteImg);

      let cardValue = this._newElement("p", "cardValue", cards[i].shortName);
      let cardContainer = this._newElement("div", "cardContainer", null);
      let card = this._newElement("div", "card", null);
      cardContainer.appendChild(suite);
      cardContainer.appendChild(cardValue);
      card.appendChild(cardContainer);

      if (i === cards.length - 1) {
        card.classList.add('swipeCard');
      }

      if (hand.lastElementChild === null) {
        hand.appendChild(card);
      } else {
        let cardsArray = hand.querySelectorAll('.card');
        let lastCard = cardsArray[cardsArray.length - 1]
        lastCard.appendChild(card);
      }
    }
  }

  _newElement(element, elClass, text) {
    let el = document.createElement(element);
    el.classList.add(elClass);
    if (text != null) {
      el.textContent = text;
    }
    return el;
  }
}