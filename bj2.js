var cardvars = require("./cardvars");
var getStrategy = require("./strategy");
var cardValueMap = new Map(cardvars.cardValues);
var cardColorMap = new Map(cardvars.cardColorMap);

var debug = true;
var BUST = -1;

var printCard = (card) => {
    var cardString = "";
    cardString += card.face + cardColorMap.get(card.color);
    return cardString;
}

var printHand = (hand) => {
    var handString = "";
    hand.cards.forEach(card => {
        handString += ( (printCard(card)) + " " );
    });
    return handString;
}


class card {
    constructor() {
        var color = null;
        var face = null;
    }
    toString() {
        var cardString = "";
        cardString += this.face + cardColorMap.get(this.color);
        return cardString;
    }
    toValue() {
        return cardValueMap.get(this.face);
    }
    randomize() {
        this.face = cardvars.cardFaces[Math.floor( Math.random() * cardvars.cardFaces.length ) ];
        this.color = cardvars.cardColorNames[Math.floor (Math.random() * cardvars.cardColorNames.length)];
    }
}

var hand = {
    cards: [],
    situation : {
        pair: false,
        soft: false,
        aces: false,
        blackjack: false,
        value: 0,
        reset: function() {
            this.value = 0;
            this.aces = false;
            this.blackjack = false;
            this.pair = false;
            this.soft = false;
        }
    },
    print: function () {
        var handString = "";
        this.cards.forEach(card => {
            handString += card.toString() + ' '
        });
        if (debug) {
            handString += ', value: ' + this.situation.value + ', soft: ' + this.situation.soft + ', pair: ' + this.situation.pair;
        }
        console.log(handString);
    },
    draw: function () {
        var drawnCard = new card();
        drawnCard.randomize();
        this.cards.push(drawnCard);
        this.recalculate();
    },
    countAces: function() {
        var aces = 0;
        this.cards.forEach(card => {
            if (card.face == 'A') {
                aces += 1;
            }
        });
        return aces;
    },
    checkPair: function() {
        if ( (this.cards.length == 2) && (this.cards[0].face == this.cards[1].face) ) {
            return this.situation.pair = true;    
        }
    },
    recalculate: function  () {

        this.situation.reset();
        this.checkPair();

        if ( (this.situation.pair) && (this.cards[0].face == 'A')) {
            this.value = 12;
            this.situation.aces = true;
            this.situation.soft = true;
            return;
        }
        
        this.cards.forEach(card => {
            this.situation.value += card.toValue();
        });
        
        var index = 0;
        var highaces = this.countAces();

        while (this.situation.value > 21) {
            if (highaces > 0) {
                highaces = highaces - 1;
                this.situation.value = this.situation.value - 10;
            }
            else {
                this.situation.value = BUST;
                break;    
            }
        }
        if (highaces > 0) {this.situation.soft = true}
        else {this.situation.soft = false}
    },
    getStrategy: function() {
        if (this.situation.value == BUST) {
            return 'NONE';
        }
        else {

        }
    } 
}

hand.draw();
hand.draw();
hand.print();
//console.log(printHand(hand));
