var Stack = require('./stack')

var stacks = [];
var against = 0;

stacksNotFinished = () => {
    var notfinished = false;

    stacks.forEach(hand => {
        if (!hand.isFinished()) {
            notfinished = true;
        }
    });
    return notfinished;

}

var self = module.exports = {
    userMoney: 100,
    play: function play() {
        
        //get the dealer
        stacks = [];
        var dealerstack = new Stack(1);// = new Hand(1);
        //create one stack and let it play
        var playerstack = new Stack(2);// = new Hand(2);
        stacks.push(playerstack);

        while (stacksNotFinished()) {
            stacks.forEach(stack => {
                console.log('Dealer:');
                dealerstack.cardShow();
                stack.play(dealerstack.getSum());
            });
            stacks.forEach(stack => {
                if (stack.isSplit()) {
                    var index = stacks.indexOf(stack);
                    if (index > -1) {
                        var splitStackArray = stacks.splice(index, 1);
                        var stackToSplit = splitStackArray[0];
                        var newStackArray = stackToSplit.splitStacks(); // MAGIC HAPPENS
                        newStackArray.forEach(element => {
                            stacks.push(element);
                        });
                    }
                }
            });
        }
        // play for dealer
        this.summarize(dealerstack.wrapUp());
        var outcome = {};
        outcome.goodchoices = 100;
        outcome.score = 5;
        console.log('Good game!');
        return outcome;
    },
    summarize: function summarize(against) {
        // remove cost money, count winnings with dealer etc
        console.log('Summarize:');
        stacks.forEach(stack => {
            if (stack.getSum() > against) {
                console.log('Won: ' + stack.bet);
            }
            else {
                console.log('Lost!');
            }
        });
    }
}






