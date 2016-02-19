import firstBy from 'thenby'
import Suit from './suit'

class Hand {
    constructor(cards) {
        if (! Array.isArray(cards)) {
            throw new Error('cards must be Array')
        }

        this.map = new Map()
        this.cards = []
        cards.forEach((card) => {
            this.add(card)
        })
        this.sort()
    }

    add(card) {
        if (this.map.size == 5) {
            throw new Error('max 5 cards')
        }
        this.map.set(card.toIdString(), card)
        this.cards.push(card)
    }

    has(card) {
        return this.map.has(card.toIdString())
    }

    values() {
        return this.cards
    }

    delete(card) {
        this.map.delete(card.toIdString())

        this.cards.forEach((c, index) => {
            if (c.toIdString() === card.toIdString()) {
                this.cards.splice(i, 1)
            }
        })
    }

    sort() {
        this.cards.sort(
            firstBy((a, b) => {
                let suitAVal = Suit.properties[a.suit].value
                let suitBVal = Suit.properties[b.suit].value
                return suitAVal - suitBVal
            })
            .thenBy((a, b) => {
                let indexA = a.value
                let indexB = b.value

                if (indexA == -1 || indexB == -1) {
                    throw new Error(`invalid card rank: A=${a.rank} B=${b.rank}`)
                }
                return indexA - indexB
            })
        )
    }

    size() {
        return this.map.size
    }

    validate() {
        if (this.map.size != 5) {
            throw new Error('hand must be 5 unique cards')
        }
    }
}

export { Hand }