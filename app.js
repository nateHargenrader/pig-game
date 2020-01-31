/*Pig Dice Game*/

//initialize variables
var scores = new Array(0, 0);
var activePlayer = 0;
var roundScore = 0;
var gameOver = false;


function winner() {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
    gameOver = true;
}

//rolls dice when roll dice button is clicked
function rollDice () {
    document.querySelector('#current-' + activePlayer).style.fontSize = '35px';
    document.querySelector('.player-current-label-' + activePlayer).style.fontSize = '18px';
    
    if (!gameOver){
        //roll the dice
        var dice1 = Math.floor(Math.random() * 6) + 1; // we need a random # btw 1 and 6
        var dice2 = Math.floor(Math.random() * 6) + 1;
    
        //display the score
        document.getElementById('dice-1').style.display = 'block';  //restore the dice to the screen
        document.getElementById('dice-2').style.display = 'block';
    
        document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png'; //display the dice that were rolled
        document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';

    
        //update score or end turn if a one is rolled
        if(dice1 !== 1 && dice2 !== 1 && scores[activePlayer] + roundScore < 100){
            roundScore = roundScore + dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (scores[activePlayer] + roundScore >= 100) {
            //check to see if someone won
            winner();
        } else {
            //call our next player function
            setTimeout(nextPlayer, 1000);
        }
    }
}

//moves play to the next player
function nextPlayer () {
    if (scores[activePlayer] >= 100){winner();}
    
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.querySelector('#current-' + activePlayer).style.fontSize = '30px';
    document.querySelector('.player-current-label-' + activePlayer).style.fontSize = '12px';
    activePlayer += 1;
    if (activePlayer === 2) {activePlayer = 0;}
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    //toggle css to active for player panels
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //make current player score bigger
    document.querySelector('#current-' + activePlayer).style.fontSize = '35px';
    document.querySelector('.player-current-label-' + activePlayer).style.fontSize = '18px';
}

function holdOn () {
    if (!gameOver){
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    }
}

function newGame () {
     window.location.reload(true);
}

//take the dice off the screen till the game starts
document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';


//listen for events
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdOn);
document.querySelector('.btn-new').addEventListener('click', newGame);