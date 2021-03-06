var MAX_POINTS = 5;

//new game button
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);
//end new game button

//pick player
var pickRock = document.getElementById('js-playerPick_rock'),
pickPaper = document.getElementById('js-playerPick_paper'),
pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
//end pick player

var gameState = 'notStarted',  //started // ended
player = {
    name: '',
    score: 0
},
computer = {
    score: 0
};

//game elements
var newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
  switch(gameState) {
    case 'started':
    newGameElem.style.display = 'none';
    pickElem.style.display = 'block';
    resultsElem.style.display = 'block';
    break;
    case 'ended':
    newGameBtn.innerText = 'Jeszcze raz';
    playerPickElem.innerText = 'Wybór gracza';
    computerPickElem.innerText = 'Wybór komputera';
    playerResultElem.innerText = 'Wynik gracza';
    computerResultElem.innerText = 'Wynik komputera';
    case 'notStarted':
    default:
    newGameElem.style.display = 'block';
    pickElem.style.display = 'none';
    resultsElem.style.display = 'none';
}
};

setGameElements();
//end game elements

//start game
var playerPointsElem = document.getElementById('js-playerPoints'),
playerNameElem = document.getElementById('js-playerName'),
computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
}
};

//choice made by player
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
};
//end choice made by player

//computer random
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
};
//end computer random

var playerPickElem = document.getElementById('js-playerPick'),
computerPickElem = document.getElementById('js-computerPick'),
playerResultElem = document.getElementById('js-playerResult'),
computerResultElem = document.getElementById('js-computerResult');

//who is a winner?
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

  if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    } else {
        computerResultElem.innerHTML = playerResultElem.innerHTML = 'REMIS!';
    }
    setGamePoints();
    endGame();
};


//end who is a winner

//update score
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
};

//end update score

//end game
function endGame() {
    if (computer.score === MAX_POINTS) {
        alert("WYGRAŁ KOMPUTER!");
        gameState = 'ended';
        setGameElements();
    }

    if (player.score === MAX_POINTS) {
        alert("WYGRAŁ " + player.name + "!");
        gameState = 'ended';
        setGameElements();
    }
};

