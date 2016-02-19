import { cardValues } from './card-values'

class Card {
    constructor(rank, suit) {
        this._rank = rank
        this._suit = suit
    }

    get rank() {
        return this._rank
    }

    get suit() {
        return this._suit
    }

    get value() {
        return cardValues.indexOf(this._rank)+2;
    }

    toIdString() {
        return this._rank + "-" + this._suit
    }

}

export { Card }