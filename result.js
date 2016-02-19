class Result {
    constructor(winner, remainingHand1, remainingHand2) {
        this._winner = winner
        this._remainingHand1 = remainingHand1
        this._remainingHand2 = remainingHand2
    }

    get winner() {
        return this._winner
    }

    get remainingHand1() {
        return this._remainingHand1
    }

    get remainingHand2() {
        return this._remainingHand2
    }
}

export { Result }