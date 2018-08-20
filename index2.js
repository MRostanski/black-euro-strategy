var getStrategy = require('./strategy');

var cardColors = [ '\u2660', '\u2663', '\u2665', '\u2666']
var cardFaces = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

var cardValues = [
    ['A', 11], 
    ['K', 10], 
    ['Q', 10], 
    ['J', 10], 
    ['10', 10], 
    ['9', 9], 
    ['8', 8], 
    ['7', 7], 
    ['6', 6], 
    ['5', 5], 
    ['4', 4], 
    ['3', 3], 
    ['2', 2]
];

var cardMap = new Map(cardValues);

class Hand {

    constructor(cardsNumber) {
        this.cards = new Array();
        for (let index = 0; index < cardsNumber; index++) {
            this.dealOne();
        }

        this.handresult = new Object();
        this.handresult = {
            pair: false,
            soft: false,
            cardvalues: [],
            result: 'ok',
            sum: 0,
        }

        this.calculateResult();
        this.checkPair();
    }

    recalculatevalues() {
        this.handresult.cardvalues.length = 0;
        this.cards.forEach(card => {
            this.handresult.cardvalues.push(cardMap.get(card.face));
        });
    }

    dealOne() {
        var card = new Object();
        card.face = cardFaces[ Math.floor( Math.random() * cardFaces.length ) ];
        card.color = cardColors [Math.floor (Math.random() * cardColors.length)];
        this.cards.push(card);
    }

    
    checkPair() {
        this.handresult.pair = false;
        if ( (this.cards.length == 2) && (this.cards[0].face == this.cards[1].face) ) {
            this.handresult.pair = true;    
        }
    }

    countValue() {
        var result = 0;
        this.handresult.cardvalues.forEach(card => {
            if (card == 11) {
                this.handresult.soft = true;
            }
            result += card;
        });
        return result;
    }


    calculateResult() {
    
        this.recalculatevalues();
    
        var result = this.countValue();
    
        while (result > 21) {
            //check for ace in hand, set result to hard
            if (this.handresult.soft == true) {
                for (let index = 0; index < this.handresult.cardvalues.length; index++) {
                    const element = this.handresult.cardvalues[index];
                    
                    if (this.handresult.soft == true) { 
                        
                        if (element == 11) {
                            this.handresult.cardvalues[index] = 1;
                            this.handresult.soft = false;
                            break;
                        }
                    }
                }
                result = this.countValue();    
            }  // and maybe we have no aces left and handresult.soft is false
            else {
                this.handresult.result = 'bust';
                result  = -1;
            }
        }
        this.handresult.sum = result;
        return result;    
    }

    show() {
        var cardstring = ""
        this.cards.forEach(element => {
            cardstring += (element.face + element.color + " ");    
        });
        return cardstring;
    }

    dealNext() {
        this.dealOne();
        this.calculateResult();
    }
    
    describe() {
        console.log(JSON.stringify(this.handresult));
    }
}

user = new Hand(2);

dealer = new Hand(1);

console.log('User:')
console.log(user.show());
user.describe();
console.log('Dealer:')
console.log(dealer.show());
dealer.describe();
console.log(getStrategy(dealer.handresult.sum, user.handresult.sum, user.handresult.pair, user.handresult.soft))
user.dealNext();
dealer.dealNext();
user.describe();
dealer.describe();


