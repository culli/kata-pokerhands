import Winner from './win-type'
import Card from './card'
import { PairHandler } from './pair'
import { Result } from './result'

class Poker {
    constructor() {
        this.pair = new PairHandler()
    }

    compareHands(hand1, hand2) {
        hand1.validate()
        hand2.validate()

        hand1.sort()
        hand2.sort()

        let pairWinner = this.pair.getWinner(hand1, hand2)
        if (pairWinner.winner > 0) {
            return pairWinner
        }

        let highestCardWinner = this.getHighestCardWinner(pairWinner.remainingHand1, pairWinner.remainingHand2)
        return highestCardWinner
    }

    getHighestCardWinner(hand1, hand2) {
        let highest1 = this.getHighestCardValue(hand1)
        let highest2 = this.getHighestCardValue(hand2)

        if (highest1 > highest2) {
            return new Result(1, hand1, hand2)
        } else if (highest2 > highest1) {
            return new Result(2, hand1, hand2)
        } else {
            return new Result(0, hand1, hand2)
        }
    }

    getHighestCardValue(hand) {
        return hand.values()[hand.size() - 1].value
    }

}
export { Poker }