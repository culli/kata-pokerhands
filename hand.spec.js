import { Hand } from './hand'
import { Card } from './card'
import Suit from './suit'

describe('Hand', () => {
    context('should sort hands', () => {
        it('* by value', () => {
            let hand =
                new Hand([
                    new Card('4', Suit.DIAMONDS),
                    new Card('3', Suit.DIAMONDS)
                ])

            expect(hand.values()).to.be.eql(
                [
                    new Card('3', Suit.DIAMONDS),
                    new Card('4', Suit.DIAMONDS)
                ])
        })

        it('* by suit then rank', () => {
            let sortedHand = new Hand([
                    new Card('4', Suit.CLUBS),
                    new Card('4', Suit.DIAMONDS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.SPADES),
                    new Card('3', Suit.DIAMONDS)
                ])

            expect(sortedHand.values()).to.be.eql(
                [
                    new Card('3', Suit.DIAMONDS),
                    new Card('4', Suit.DIAMONDS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS),
                    new Card('4', Suit.SPADES)
                ])
        })

        it('* with ranks ordered correctly', () => {
            let sortedHand = new Hand([
                    new Card('4', Suit.SPADES),
                    new Card('4', Suit.HEARTS),
                    new Card('4', Suit.CLUBS),
                    new Card('3', Suit.SPADES),
                    new Card('4', Suit.DIAMONDS)
                ])

            expect(sortedHand.values()).to.be.eql(
                [
                    new Card('4', Suit.DIAMONDS),
                    new Card('4', Suit.CLUBS),
                    new Card('4', Suit.HEARTS),
                    new Card('3', Suit.SPADES),
                    new Card('4', Suit.SPADES)
                ])
        })
    })
})