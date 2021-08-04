const newDeckBtn = document.getElementById("new-deck-btn");
const drawBtn = document.getElementById("draw-btn")
const playerImg = document.getElementById("player-img")
const opponentImg = document.getElementById("opponent-img")

let deckId;
let playerCard;
let opponentCard;

newDeckBtn.addEventListener("click", drawNewDeck);
drawBtn.addEventListener("click", drawCards)

function drawNewDeck() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle").then(res => res.json()).then(data => {
        deckId = data.deck_id;
        newDeckBtn.style.display = "none"
        drawBtn.style.display = "block"
    })
}

function drawCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(res => res.json()).then(data => {
        console.log(data.cards)
        playerCard = data.cards[0];
        console.log(playerCard)
        opponentCard = data.cards[1];
        console.log(opponentCard)
        playerImg.src = playerCard.image
        opponentImg.src = opponentCard.image
    })
}
