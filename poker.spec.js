import { Poker } from './poker'
import { Card } from './card'
import { Hand } from './hand'
import { Result } from './result'
import Suit from './suit'

describe('poker service', () => {

    let poker
    beforeEach(() => {
        poker = new Poker()
    })

    it('should only allow hands of 5 cards', () => {
        let hand1 = new Hand([
            new Card('4', Suit.DIAMONDS),
            new Card('3', Suit.DIAMONDS),
            new Card('2', Suit.DIAMONDS),
            new Card('Q', Suit.DIAMONDS)
        ])
        let hand2 = new Hand([
            new Card('5', Suit.DIAMONDS),
            new Card('3', Suit.DIAMONDS)
        ])
        expect(() => poker.compareHands(hand1, hand2)).to.throw('hand must be 5 unique cards')
    })

    context('should rank by highest card', () => {

        it('* two hands', () => {
            let hand1 = new Hand([
                new Card('4', Suit.DIAMONDS),
                new Card('3', Suit.DIAMONDS),
                new Card('2', Suit.DIAMONDS),
                new Card('5', Suit.DIAMONDS),
                new Card('6', Suit.DIAMONDS)
            ])
            let hand2 = new Hand([
                new Card('7', Suit.HEARTS),
                new Card('3', Suit.HEARTS),
                new Card('2', Suit.HEARTS),
                new Card('5', Suit.HEARTS),
                new Card('6', Suit.HEARTS)
            ])
            let winner = poker.compareHands(hand1, hand2)

            let remainingHand1 = new Hand([
                new Card('2', Suit.DIAMONDS),
                new Card('3', Suit.DIAMONDS),
                new Card('4', Suit.DIAMONDS),
                new Card('5', Suit.DIAMONDS),
                new Card('6', Suit.DIAMONDS)
            ])
            let remainingHand2 = new Hand([
                new Card('2', Suit.HEARTS),
                new Card('3', Suit.HEARTS),
                new Card('5', Suit.HEARTS),
                new Card('6', Suit.HEARTS),
                new Card('7', Suit.HEARTS)
            ])
            expect(winner).to.be.eql(new Result(2, remainingHand1, remainingHand2))

        })

        it('* should get the highest card', () => {
            let highestCard = poker.getHighestCardValue(
                new Hand([
                new Card('3', Suit.DIAMONDS),
                new Card('5', Suit.DIAMONDS)
            ]))

            expect(highestCard).to.be.eql(5) //index value from cardValues
        })

        it('* should get the hand with the highest card', () => {
            let hand1 = new Hand([
                new Card('3', Suit.DIAMONDS),
                new Card('4', Suit.DIAMONDS),
                new Card('5', Suit.DIAMONDS),
                new Card('6', Suit.DIAMONDS),
                new Card('7', Suit.DIAMONDS)
            ])
            let hand2 = new Hand([
                new Card('3', Suit.HEARTS),
                new Card('4', Suit.HEARTS),
                new Card('5', Suit.HEARTS),
                new Card('6', Suit.HEARTS),
                new Card('8', Suit.HEARTS)
            ])
            let highestHand = poker.getHighestCardWinner(hand1, hand2)
            expect(highestHand).to.be.eql(new Result(2, hand1, hand2))
        })
    })


})