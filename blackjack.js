var readlineSync = require('readline-sync');
var game = require('./game');

var games = 0;
var scores = [];
var goodchoices = [];
var highscore = 0;
var goodchoiceshigh = 0;
var outcome;
var answer = 'Y';


while (answer == 'Y') {
    outcome = game.play();
    scores.push(outcome.score);
    goodchoices.push(outcome.goodchoices);
    games += 1;
    if (outcome.score > highscore) {
        highscore = outcome.score;
    }
    var answer = readlineSync.question( 'Play again (Y/N)?');

}

console.log('Highscore: ' + highscore);
console.log('Good strategies percentage: ' + goodchoices);
