import React, { useState, useEffect, useRef } from 'react' 
import Card from './Card' 
import axios from 'axios'

const URL = `http://deckofcardsapi.com/api/deck`

const Deck = () => {
    // initialize state
    const [card, setCard] = useState([])
    const [deck, setDeck] = useState(null) 
    // state for automatic 
    const [autoShuffle, setAutoShuffle] = useState(false) 
    const timeId = useRef(null)

    useEffect(() => {
        async function getDeck() {
            try {
                let response = await axios.get(`${URL}/new/shuffle/`)
                // Deck holds data from API (deck_id, remaining, etc.)
                setDeck(response.data) 
            } catch(err) {
                alert(err) 
            }
        }
        // execute async function 
        getDeck() 
        // setDeck dependency 
    }, [setDeck])

    useEffect(() => {
        async function giveCard() {
            // destructure deck_id from deck 
            const { deck_id } = deck 
            try {
                let response = await axios.get(`${URL}/${deck_id}/draw`)
                // console.log(response.data)
                // console.log(response.data.cards[0])
                let card = response.data.cards[0]
    
                setCard(d => [
                    ...d, 
                    {
                        id: card.code, 
                        name: `${card.value} of ${card.suit}`,
                        image: card.image
                    }
                ])
    
                // if there are no more cards left in deck
                if(response.data.remaining === 0) {
                    // stop drawing cards
                    setAutoShuffle(false) 
                    // throw error 
                    throw new Error('no more cards left!') 
                }
    
            } catch(err) {
                alert(err)
            }
        }

        if(autoShuffle && !timeId.current) {
            timeId.current = setInterval(async () => {
                await giveCard()
            }, 1000)
        }

        return() => {
            clearInterval(timeId.current) 
            timeId.current = null 
        }


    }, [autoShuffle, setAutoShuffle, deck])

    const toggleAutoDraw = () => {
        setAutoShuffle(auto => !auto); 
    }
    
    // loop over the cards array and display each card
    const cards = card.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ))

    return (
        <div>
            <button onClick={(toggleAutoDraw)}>Gimme a Card!</button>
            <ul>
                {cards}
            </ul>
        </div>
    )
}

export default Deck 