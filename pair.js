import {Result} from './result'
import { Hand } from './hand'

class PairHandler {
    getWinner(hand1, hand2) {
        let highestPair1 = this.getHighestPair(hand1)
        let highestPair2 = this.getHighestPair(hand2)

        if (highestPair1.length == 0 && highestPair2.length == 0) {
            return new Result(0, hand1, hand2)
        }

        if (highestPair1.length == 0 && highestPair2.length > 0) {
            let remainingHand2 = this.getRemainingHand(hand2, highestPair2)
            return new Result(2, hand1, remainingHand2)
        }

        if (highestPair1.length > 0 && highestPair2.length == 0) {
            let remainingHand1 = this.getRemainingHand(hand1, highestPair1)
            return new Result(1, remainingHand1, hand2)
        }

        var remainingHand1 = this.getRemainingHand(hand1, highestPair1)
        let remainingHand2 = this.getRemainingHand(hand2, highestPair2)
        let highestPairValue1 = highestPair1[0].value
        let highestPairValue2 = highestPair2[0].value

        if (highestPairValue1 > highestPairValue2) {
            return new Result(1, remainingHand1, remainingHand2)
        } else if (highestPairValue1 < highestPairValue2) {
            return new Result(2, remainingHand1, remainingHand2)
        } else {
            return new Result(0, remainingHand1, remainingHand2)
        }
    }

    getRemainingHand(hand, winningCards) {
        let winningHand = new Hand(winningCards)
        return new Hand(hand.values().filter(card1 => !winningHand.has(card1)))
    }

    getHighestPair(hand) {
        let highestPairValue = 0
        let highestRank = null

        let rankMap = hand.values()
            .reduce((groups, card) => {
                let rank = card.rank.toString()
                if (!groups.get(rank)) {
                    groups.set(rank, [])
                }
                groups.get(rank).push(card)

                return groups
            }, new Map())

        let rankGroups = [...rankMap.entries()]

        rankGroups.filter((group) => {
            if (group[1].length == 2) {
                let groupRank = group[1][0].rank
                let thisPairValue = group[1][0].value
                if (thisPairValue > highestPairValue) {
                    highestPairValue = thisPairValue
                    highestRank = groupRank
                }
                return true
            }

            return false
        })

        //no pairs
        if (!highestRank) {
            return []
        }

        return rankMap.get(highestRank)
    }
}

export { PairHandler }