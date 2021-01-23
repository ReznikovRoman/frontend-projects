'use strict';

// Select HTML elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playersEl = [player0El, player1El];

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRules = document.querySelector('.btn--rules');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const overlay = document.querySelector('.overlay');
const popupEl = document.querySelector('.popup');
const closePopupEl = document.querySelector('.close_popup');


score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');

const scores = [0, 0];  // base scores
let currentScore = 0;
let currentPlayer = 0;


function updateScore() {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent = String(scores[currentPlayer]);
}


function isGameEnded() {
    return scores[currentPlayer] >= 100;
}


function switchPlayer() {
    playersEl[currentPlayer].classList.toggle('player--active');
    currentScore = 0;
    document.getElementById(`current--${currentPlayer}`).textContent = String(currentScore);
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    playersEl[currentPlayer].classList.toggle('player--active');
}


function endGame() {
    diceEl.classList.add('hidden');
    playersEl[currentPlayer].classList.remove('player--active');
    playersEl[currentPlayer].classList.add('player--winner');
}

function resetGame() {
    diceEl.classList.add('hidden');
    playersEl[currentPlayer].classList.remove('player--winner');
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
    score0El.textContent = '0';
    score1El.textContent = '0';
    current0El.textContent = '0';
    current1El.textContent = '0';

    currentPlayer = 0;
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    playersEl[currentPlayer].classList.add('player--active');
}


function closePopup() {
    popupEl.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}


btnRules.addEventListener(
    'click',
    function () {
        popupEl.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
    }
);

closePopupEl.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);

document.addEventListener(
    'keydown',
    function (event) {
        if (event.key === 'Escape') {
            closePopup();
        }
    }
)


btnNew.addEventListener('click', resetGame);

// Rolling dice features
btnRoll.addEventListener(
    'click',
    function () {

        // if there is no winner yet - we can click the 'Roll' button
        if (!isGameEnded()) {
            // generate a random dice roll
            const diceNum = Math.trunc(Math.random() * 6) + 1;

            // display this dice
            diceEl.classList.remove('hidden');  // 'show' the dice
            diceEl.src = `images/dice-${diceNum}.png`;  // pick the correct dice

            // check for rolled 1; if true, switch to a next player
            if (diceNum !== 1) {
                // Add diceNum to the current user's score
                currentScore += diceNum;
                document.getElementById(`current--${currentPlayer}`).textContent = String(currentScore);
            } else {
                // Delete current score and Switch to another player
                switchPlayer();
            }
        }
    }
);

btnHold.addEventListener(
    'click',
    function () {
        // if there is no winner yet - we can click the 'Hold' button
        if (!isGameEnded()) {
            updateScore();
            if (!isGameEnded()) switchPlayer();
            else endGame();
        }
    }
);


