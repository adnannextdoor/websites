let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

updateScoreElement();

function clearScreen() {
  document.querySelector('.del-result').innerHTML = ''
  document.querySelector('.del-moves').innerHTML = ''
}

function updateScoreElement() {
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Ties: ${score.ties} Losses: ${score.losses}`;
}  


function pickComputerMove() {
const randomNumber = Math.random(); 

let compMove = '';

if (randomNumber < 1/3 && randomNumber >= 0) {
  compMove = 'rock';
} else if (randomNumber < 2/3 && randomNumber >= 1/3) {
  compMove = 'paper';
} else if (randomNumber < 1 && randomNumber >= 2/3) {
  compMove = 'scissors';
}

return compMove;
}

let isAutoplaying = false
let intervalId;


// const autoplay = () => {

// };

function autoPlay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerPick = pickComputerMove();
      playGame(playerPick);
    }, 1000);
    isAutoplaying = true;
    document.querySelector('.auto-play-button').innerHTML = 'Stop play'
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
    document.querySelector('.auto-play-button').innerHTML = 'Auto play'
  }
  
}


const rockButton = document.querySelector('.js-rock-button')
rockButton.addEventListener('click', () => {
  playGame('rock');
});

const paperButton = document.querySelector('.js-paper-button')
paperButton.addEventListener('click', () => {
  playGame('paper');
});

const scissorsButton = document.querySelector('.js-scissors-button')
scissorsButton.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } if (event.key === 's') {
    playGame('scissors');
  }
  
})

function playGame(playerPick) {
const compMove = pickComputerMove();


let result = '';

if (playerPick === 'rock') {
  if (compMove === 'rock') {
    result = 'Tie!';
    score.ties++;
  }
    else if (compMove === 'paper') {
    result = 'You lose!';
    score.losses++;
  } else if (compMove === 'scissors') {
    result = 'You win!';
    score.wins++;
  }

} else if (playerPick === 'paper') {
  if (compMove === 'rock') {
    result = 'You win!';
    score.wins++;
  }
    else if (compMove === 'paper') {
    result = 'Tie!';
    score.ties++;
  } else if (compMove === 'scissors') {
    result = 'You lose!';
  }

} else {
  if (compMove === 'rock') {
    result = 'You lose!';
    score.losses++;
  }
    else if (compMove === 'paper') {
    result = 'You win!';
    score.wins++;
  } else if (compMove === 'scissors') {
    result = 'Tie!';
    score.ties++;
  }

}


localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML = result

document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerPick}-emoji.png" class="move-icon">
<img src="images/${compMove}-emoji.png" class="move-icon">
Computer`

}
