const newDeckBtn = document.getElementById("new-deck-btn");
const drawBtn = document.getElementById("draw-btn")
const playerImg = document.getElementById("player-img")
const opponentImg = document.getElementById("opponent-img")
const playerScoreEl = document.getElementById("player-score")
const opponentScoreEl = document.getElementById("opponent-score")
const heading = document.querySelector("h1")
const remainingCardsEl = document.getElementById("remaining-cards")

let deckId;
let playerCard;
let opponentCard;

newDeckBtn.addEventListener("click", drawNewDeck);
drawBtn.addEventListener("click", drawCards)

function drawNewDeck() {
    heading.textContent = "War!"
    playerImg.src = ""
    opponentImg.src = ""
    playerScore = 0;
    opponentScore = 0;
    playerScoreEl.textContent = playerScore
    opponentScoreEl.textContent = opponentScore
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle").then(res => res.json()).then(data => {
        deckId = data.deck_id;
        newDeckBtn.style.display = "none"
        drawBtn.style.display = "block"
        remainingCardsEl.textContent = data.remaining
        // console.log(data)
    })
}

function drawCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(res => res.json()).then(data => {
        // console.log(data)
        // console.log(data.cards)
        playerCard = data.cards[0];
        // console.log(playerCard)
        opponentCard = data.cards[1];
        // console.log(opponentCard)
        playerImg.src = playerCard.image
        opponentImg.src = opponentCard.image
        heading.textContent = compCards(playerCard, opponentCard)
        remainingCardsEl.textContent = data.remaining
        if (data.remaining === 0) {
            if (playerScore > opponentScore) {
                heading.textContent = "Game over, player won!";
            } else if (playerScore < opponentScore) {
                heading.textContent = "Game over, opponent won!";
            } else {
                heading.textContent = "Game over, it's a tie!";
            }
            drawBtn.style.display = "none"
            newDeckBtn.style.display = "block"
        }
    })
}

function compCards(card1, card2) {
    const diff = valueToNum(card1.value) - valueToNum(card2.value)
    if (diff > 0) {
        playerScore += diff;
        playerScoreEl.textContent = playerScore;
        return "Player won round!"
    } else if (diff < 0) {
        opponentScore -= diff;
        opponentScoreEl.textContent = opponentScore;
        return "Opponent won round!"
    } else {
        return "Tie!"
    }
}

function valueToNum(value) {
    // Value is either a number or jack, queen, king or ace
    switch (value) {
        case "ACE":
            return 14

        case "KING":
            return 13;

        case "QUEEN":
            return 12;

        case "JACK":
            return 11;
        default:
            return parseInt(value)
    }

}