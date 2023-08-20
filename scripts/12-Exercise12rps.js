let score = JSON.parse(localStorage.getItem('score')) || {'wins': 0, 'losses' : 0 , 'ties' : 0};

updateScoreElement();

isAutoPlaying = false;
let intervalId = undefined;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        isAutoPlaying = true;
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    } else if (isAutoPlaying) {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto play';
    }
}

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        resetScore();
    }
})

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock')
    } else if (event.key === 'p') {
        playGame('paper')
    } else if (event.key === 's') {
        playGame('scissors')
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'paper') {
        if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        } else if (computerMove === 'rock') {
            result = 'You win.';
        }

                } 
    else if (playerMove === 'scissors') {
        if (computerMove === 'scissors') {
            result = 'Tie.';
        } else if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        }


                    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }


    }

    if (result === 'You win.') {
        score.wins += 1;
    } 
    else if (result === 'You lose.') {
        score.losses += 1;
    } 
    else if (result === 'Tie.') {
        score.ties +=1
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = ` You
<img class="move-icon" src="images/${playerMove}-emoji.png">
<img class="move-icon" src="images/${computerMove}-emoji.png">
Computer `


}
                
function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';   
    
    if (randomNumber < (1/3)) {
        computerMove = 'rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    }
    else{
        computerMove = 'scissors';
    }

    return computerMove
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

willReset = undefined;

function resetScore() {
        document.querySelector('.reset-score-confirm').innerHTML = `
        Are you sure you want to reset the score? <button class="yes-button">Yes</button><button class="no-button">No</button>
        `
        document.querySelector('.yes-button').addEventListener('click', () => {
            willReset = true;
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
    
            localStorage.removeItem('score');
            updateScoreElement();
                        document.querySelector('.reset-score-confirm').innerHTML = '';
        });
        document.querySelector('.no-button').addEventListener('click', () => {
            willReset = false;
            document.querySelector('.reset-score-confirm').innerHTML = '';
        });


}


document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    resetScore();
})

