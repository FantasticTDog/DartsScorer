
let player1 = {
    name: 'Player One',
    currentGoal: 0,
    currentScore: 0,
    totalScore: 0,
}

let player2 = {
    name:'Player Two',
    currentGoal: 0,
    currentScore: 0,
    totalScore: 0,
}

let player3 = {
    name:'Player Three',
    currentGoal: 0,
    currentScore: 0,
    totalScore: 0,
}

let player4 = {
    name:'Player Four',
    currentGoal: 0,
    currentScore: 0,
    totalScore: 0,
}

let players = [
    player1,
    player2,
    player3,
    player4,
];

let noOfPlayers = players.length;
let noOfActivePlayers = 0

//variable to determine and change the active player
let playerCount = 0
let round = 1

//array that stores score of current round
let arrayRound = []
let dart = 0
let maxRounds = 2;

//variable to deactivate functions of number-buttons when game is over
let gameIsActive = false

activePlayer = players[playerCount]

const containerPlayers = document.querySelector('.players');
containerPlayers.classList.add("containerPlayers");

function createPlayer() {
    if (noOfActivePlayers < 4) {
        const contentPlayer = document.createElement('div');
        contentPlayer.classList.add("playerScoreBoard")
        players[noOfActivePlayers].name = document.querySelector(".playerName").value;
        contentPlayer.innerHTML= '<p class = "playerName">' + players[noOfActivePlayers].name + '</p><p class = "playerScore">Points: 0</p><p class = "playerGoal">Goal: 0</p>';
        containerPlayers.appendChild(contentPlayer);
        document.querySelector(".playerName").value = "";
        noOfActivePlayers ++;
    } else {alert("Game allows for max of 4 Players!")}

}

function startGame() {
    if (noOfActivePlayers == 0){
        alert("Add at least on Player!")
    } else {
        gameIsActive = true;
        //first Player is highlighted
        document.querySelector(".playerScoreBoard").classList.add("playerScoreBoardActive")
        //input fields are hidden
        document.querySelector(".inputs").remove()
    }
}

const buttons = document.querySelectorAll('.number');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (gameIsActive == true){
            addPoints(button);
            checkRound()
        }
    })
})

function addPoints(button) {
    //store pushed button content in the array at position 0, 1 or 2
    arrayRound[dart] = Math.floor(button.textContent)
    activePlayer.currentScore += arrayRound[dart];
    console.log(activePlayer.name + ': ' + activePlayer.currentScore);
    //next dart
    dart += 1;
}

//check, which dart and round we are in, change Player if necessary 
function checkRound(){
    if (dart == 3) {
        //store this round's three hits in the active Player array as three integers
        activePlayer[round] = arrayRound
        //check if goal of this round was met; if not: add points to totalScore
        calcScore()
        //set new goal for next round based on this round's result
        activePlayer.currentGoal = activePlayer.currentScore
        //reset current player's currentScore for next round
        activePlayer.currentScore = 0
        //print Results to screen
        printScore()
        //next Player
        playerCount += 1
        //check if all players have played this round, then: next round
        if (playerCount >= noOfActivePlayers){
            playerCount = 0
            round += 1
            checkForEnd()
        }
        //next activePlayer
        activePlayer = players[playerCount]
        dart = 0 
    }
}

function calcScore() {
    if (activePlayer.currentScore < activePlayer.currentGoal) {
        activePlayer.totalScore += (activePlayer.currentGoal - activePlayer.currentScore)
    }
    console.log('Punkte: '+ activePlayer.totalScore);
}

function printScore() {
    contentPlayers = document.querySelectorAll(".playerScoreBoard")
    for (let i = 0; i < noOfActivePlayers; i++) {
        contentPlayers[i].innerHTML= '<p class = "playerName">' + players[i].name + '</p><p class = "playerScore">Points: ' + players[i].totalScore + '</p><p class = "playerGoal">Goal: ' + players[i].currentGoal + '</p>';
    }
}

function checkForEnd(){
    if (round > maxRounds) {
        gameIsActive = false;
        alert('Game Over!')
    }
}