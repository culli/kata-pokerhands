import { Card } from './card'
import Suit from './suit'
import { PairHandler } from './pair'
import { Poker } from './poker'
import { Result } from './result'
import { Hand } from './hand'

describe('PairHandler', () => {
    let pair
    let poker
    beforeEach(() => {
        pair = new PairHandler()
        poker = new Poker()
    })

    it('should remove cards from the hand that make up the pair', () => {
        let winningCards = [
            new Card('K', Suit.SPADES),
            new Card('K', Suit.HEARTS)
        ]
        let hand = new Hand([
            new Card('6', Suit.HEARTS),
            new Card('7', Suit.HEARTS),
            new Card('8', Suit.HEARTS),
            new Card('K', Suit.HEARTS),
            new Card('K', Suit.SPADES)
        ])
        let result = pair.getRemainingHand(hand, winningCards)
        expect(result.values()).to.be.eql([
                new Card('6', Suit.HEARTS),
                new Card('7', Suit.HEARTS),
                new Card('8', Suit.HEARTS)
        ])
    })

    context('should rank by pairs', () => {
            it('* get the highest pair value from a hand with one pair', () => {
                let hand = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS),
                    new Card('4', Suit.DIAMONDS),
                    new Card('T', Suit.CLUBS)
                ])

                let highestPair = pair.getHighestPair(hand)
                expect(highestPair).to.be.eql([
                    new Card('4', Suit.DIAMONDS),
                    new Card('4', Suit.CLUBS)
                ])
            })

            it('* get the highest pair value from a hand with two pair', () => {
                let hand = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('4', Suit.DIAMONDS),
                    new Card('4', Suit.CLUBS),
                    new Card('T', Suit.DIAMONDS),
                    new Card('T', Suit.CLUBS)
                ])

                let highestPair = pair.getHighestPair(hand)
                expect(highestPair).to.be.eql([
                    new Card('T', Suit.DIAMONDS),
                    new Card('T', Suit.CLUBS)
                ])
            })

            it('* rank hands with one hand having a pair, the other nothing', () => {
                let hand1 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('4', Suit.SPADES),
                    new Card('4', Suit.CLUBS),
                    new Card('T', Suit.DIAMONDS),
                    new Card('T', Suit.CLUBS)
                ])
                let hand2 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS),
                    new Card('5', Suit.DIAMONDS),
                    new Card('Q', Suit.CLUBS)
                ])
                let winner = poker.compareHands(hand1, hand2)

                let remainingHand1 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('4', Suit.SPADES),
                    new Card('4', Suit.CLUBS)
                ])

                let remainingHand2 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS),
                    new Card('5', Suit.DIAMONDS),
                    new Card('Q', Suit.CLUBS)
                ])
                let expectedResult = new Result(1, remainingHand1, remainingHand2)
                expect(winner).to.be.eql(expectedResult)
            })

            it('* rank hands with both hands having a pair', () => {
                let hand1 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS),
                    new Card('Q', Suit.DIAMONDS),
                    new Card('Q', Suit.CLUBS)
                ])
                let hand2 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS),
                    new Card('T', Suit.DIAMONDS),
                    new Card('T', Suit.CLUBS)
                ])
                let winner = poker.compareHands(hand1, hand2)

                let remainingHand1 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS)
                ])
                let remainingHand2 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS)
                ])
                expect(winner).to.be.eql(new Result(1, remainingHand1, remainingHand2))
            })

            it('* rank hands with a tie for a pair using remaining cards', () => {
                let hand1 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS),
                    new Card('Q', Suit.DIAMONDS),
                    new Card('Q', Suit.CLUBS)
                ])
                let hand2 = new Hand([
                    new Card('2', Suit.DIAMONDS),
                    new Card('3', Suit.DIAMONDS),
                    new Card('5', Suit.DIAMONDS),
                    new Card('Q', Suit.HEARTS),
                    new Card('Q', Suit.SPADES)
                ])
                let winner = poker.compareHands(hand1, hand2)

                let remainingHand1 = new Hand([
                    new Card('2', Suit.CLUBS),
                    new Card('3', Suit.CLUBS),
                    new Card('4', Suit.CLUBS)
                ])
                let remainingHand2 = new Hand([
                    new Card('2', Suit.DIAMONDS),
                    new Card('3', Suit.DIAMONDS),
                    new Card('5', Suit.DIAMONDS)
                ])
                expect(winner).to.be.eql(new Result(2, remainingHand1, remainingHand2))
            })
        }
    )
})