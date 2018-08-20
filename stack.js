var Hand = require('./hand');
var getStrategy = require('./strategy');
var readlineSync = require('readline-sync');

class Stack {

    constructor(count) {
        this.state = 'WAITING';
        this.hand = new Hand(count);
        this.bet = 10;

    }

    cardShow() {
        console.log(this.hand.show());
        this.hand.describe();
    }
    
    decisionAsk() {
        if (this.hand.handresult.pair) {
            var answer = readlineSync.question( '(H)it, (S)tand, (D)ouble or S(P)lit?');
        }
        else if (this.state == 'HITTING') {
            var answer = readlineSync.question( '(H)it or (S)tand?');
        }
        else {
            var answer = readlineSync.question( '(H)it, (S)tand, (D)ouble?');
        }
        return answer;
    }


    play(against) {
        this.cardShow();
        var decision = this.decisionAsk();
        console.log(against, this.getSum(), this.hand.handresult.pair, this.hand.handresult.soft);
        var strategy = getStrategy(against, this.hand.handresult.sum, this.hand.handresult.pair, this.hand.handresult.soft);
    
        console.log('Good strategy was: ' + strategy)
        if (strategy == decision) {
            console.log('Good choice!');
        }
        // allowed player to decide, 
        // stand will set state to 'FINISHED'
        if (decision == 'S') {
            this.state = 'FINISHED';
        }
        // hit will continue play, state set to 'WAITING' or 'FINISHED' if bust
        if (decision == 'H') {
            this.state = 'HITTING';
            while (this.state == 'HITTING') {
                this.hand.dealNext();
                this.cardShow();
                if (this.hand.isBust()) {
                    this.state = 'FINISHED';
                }
                else {
                    var answer = readlineSync.question( '(H)it or (S)tand?');
                    strategy = getStrategy(against, this.hand.handresult.sum, this.hand.handresult.pair, this.hand.handresult.soft);
                    console.log('Good strategy was: ' + strategy)
                    if (strategy == answer) {
                        console.log('Good choice!');
                    }
                    if (answer == 'S') {
                        this.state = 'FINISHED';
                    }
                }
            }
        }
        // if split, set state to 'SPLIT'
        if (decision == 'P') {
            this.state = 'SPLIT';
            this.bet = 0;
        }
        // if double, state set to 'FINISHED'
        if (decision == 'D') {
            this.state = 'FINISHED';
            this.hand.dealNext();
            this.cardShow();
            this.bet += this.bet;
        }
    }

    wrapUp() {
        // the same as user, but automatic
        console.log('Dealer draws...');
        while ( (!this.hand.isBust()) && this.getSum() < 17 ) {
            this.hand.dealNext();
        }
            this.cardShow();
        return this.getSum();
    }

    getSum() {
        return this.hand.handresult.sum;
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

    splitStacks() {
        var newStacks = [];
        var newHand1 = new Stack(0);
        newHand1.hand.cards.push(this.hand.cards.pop());
        newHand1.hand.calculateResult();
        var newHand2 = new Stack(0);
        newHand2.hand.cards.push(this.hand.cards.pop());
        newHand2.hand.calculateResult();
        
        newStacks.push(newHand1);
        newStacks.push(newHand2);

        return newStacks;
    }
}

module.exports = Stack;