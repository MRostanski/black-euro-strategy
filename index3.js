var readlineSync = require('readline-sync');
var getStrategy = require('./strategy');
var Hand = require('./hand');

var decision;
var strategy;

cardShow = () => {
    console.log('User:')
    console.log(user.show());
    user.describe();
    console.log('Dealer:')
    console.log(dealer.show());
    dealer.describe();
}

decisionAsk = () => {
    if (user.handresult.pair) {
        var answer = readlineSync.question( '(H)it, (S)tand, (D)ouble or S(P)lit?');
    }
    else {
        var answer = readlineSync.question( '(H)it, (S)tand, (D)ouble?');
    }
    return answer;

}

turnPlay = () => {

    cardShow();
    decision = decisionAsk();
    strategy = getStrategy(dealer.handresult.sum, user.handresult.sum, user.handresult.pair, user.handresult.soft);

    console.log('Strategy: ' + strategy)
    if (strategy == decision) {
        console.log('Good choice!');
    
    return decision;
}


}

user = new Hand(2);
dealer = new Hand(1);

switch (turnPlay()) {
    case 'H':
        user.dealNext();
        break;
    case 'D':
        user.dealNext();
        break;
    case 'S':
        ;
        break;
}
dealer.dealNext();


// game
// setting up user with money
// holding plays record: stacks (cards[], decisions[], good_strategies[]), winnings[], 
// setting up play 
// keeping score: plays, wins, strategies, money

//play.start(fresh)
  // create one stack. stack has money. get them from user 
  // stacks[1]

//stack.split
    // remove stack, add two new stacks
    // get more money into second stack
    // you have two stacks (users) now

//stack.hit
    // draw card, allow for decision again

//stack.double
    // get more money
    // do not allow to draw card more. wrap up stack

//stack.stand
    // wrapUp stack

// play: stacks[], dealer

//play.wrapUp
wrapUp = () => {
    // finishing dealer
    // comparing outcome for every stack
    // adding/removing money
}

