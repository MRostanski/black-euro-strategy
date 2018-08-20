var cardvars = require('./cardvars')
var cardMap = new Map(cardvars.cardValues);


class Hand {

    constructor(cardsNumber = 0) {
        
        //this.state = 'WAITING';
        this.handresult = new Object();
        this.handresult = {
            pair: false,
            soft: false,
            cardvalues: [],
            result: 'ok',
            sum: 0,
        }

        if (cardsNumber > 0) {
            this.cards = [];
            for (let index = 0; index < cardsNumber; index++) {
                this.dealOne();
            }
            
        }
    }

    recalculatevalues() {
        this.handresult.cardvalues.length = 0;
        this.cards.forEach(card => {
            this.handresult.cardvalues.push(cardMap.get(card.face));
        });
    }

    dealOne() {
        var card = {};
        card.face = cardvars.cardFaces[ Math.floor( Math.random() * cardvars.cardFaces.length ) ];
        card.color = cardvars.cardColors [Math.floor (Math.random() * cardvars.cardColors.length)];
        this.cards.push(card);

        this.calculateResult();
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
        this.checkPair();
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
    }
    
    describe() {
        console.log(JSON.stringify(this.handresult));
    }

    isBust() {
        if (this.handresult.result == 'bust') {
            return true;
        }
        else return false;
    }

    compare(player1, player2) {
        if ((player1.isBust() && player2.isBust()) || (player1.handresult.sum == player2.handresult.sum) ) {
            return 0;
        }
        else if (player1.isBust()) {
            return -1;
        }
        else if (player2.isBust()) {
            return 1;
        }
        else if (player1.handresult.sum > player2.handresult.sum) {
            return 1;
        }
        else if (player1.handresult.sum < player2.handresult.sum) {
            return 1;
        }
        else {
            console.log('SOME PROBLEMS WITH COMPARE!!');
        }
    }

    play() {
        // allow player to decide, 
        // stand will set state to 'FINISHED'
        // hit will continue play, state set to 'WAITING' or 'FINISHED' if bust
        // if split, set state to 'SPLIT'
        // if double, state set to 'FINISHED'
    }

    isSplit() {
        //player decided to split. 
        if (this.state == 'SPLIT') {
            return true;
        }
        else return false; 
    }

    isAwaiting() {
        //player turn now
        if (this.state == 'WAITING') {
            return true;
        }
        else return false;
    }
    isFinished() {
        if (this.state == 'FINISHED') {
            return true;
        }
        else return false;
    }
}

module.exports = Hand;