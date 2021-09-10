// Helper Functions (play with node & Insomnia)
// import axios from 'axios' 

// const URL = `http://deckofcardsapi.com/api/deck`

// async function getDeck() {
//     const res = await axios.get(`${URL}/new/shuffle/`)
//     deck = res.data
//     console.log(deck.deck_id)  // r7u7q4t6yept 
// }

// async function giveCard() {

//     const res = await axios.get(`${URL}/r7u7q4t6yept/draw/`)
//     let card = res.data.cards[0]
//     let value = res.data.cards[0].value
//     let suit = res.data.cards[0].suit
//     console.log(`${value} of ${suit}`)
// }