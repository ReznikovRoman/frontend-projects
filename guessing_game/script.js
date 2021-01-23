'use strict';

let number = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;
let currentTheme = 'dark';

const body = document.querySelector('body');
const main = document.querySelector('main');

const scoreHTMl = document.querySelector('.score');
const highscoreHTMl = document.querySelector('.highscore');
const displayedNumber = document.querySelector('.number');
const guess = document.querySelector('.guess');

const btnAgain = document.querySelector('.again');
const btnCheck = document.querySelector('.check');
const btnTheme = document.querySelector('.theme_icon');


function displayMessage(message) {
    document.querySelector('.message').textContent = message;
}


function switchTheme() {
    if (currentTheme === 'dark') {
        currentTheme = 'light';
        setLightTheme();
    } else {
        currentTheme = 'dark';
        setDarkTheme();
    }
}


function setLightTheme() {
    body.style.color = '#222';
    body.style.backgroundColor = '#88afff5c';
    main.style.color = '#222';
    displayedNumber.style.color = '#eee';
    displayedNumber.style.border = '#222';
    displayedNumber.style.backgroundColor = '#222';
    btnTheme.style.color = '#222';
    guess.style.color = '#222';
    guess.style.backgroundColor = '#eee';
    guess.style.borderColor = '#222';

    document.querySelectorAll('.btn').forEach(function (btn) {
        btn.classList.remove('dark_btn', 'dark_btn_hover');
        btn.classList.add('light_btn');

        btn.addEventListener(
            'mouseover',
            function () {
                btn.classList.remove('dark_btn_hover');
                this.classList.add('light_btn_hover')
            }
        )
        btn.addEventListener(
            'mouseleave',
            function () {
                this.classList.remove('light_btn_hover')
            }
        )
    });
}


function setDarkTheme() {
    body.style.color = '#eeeeee';
    body.style.backgroundColor = '#222';
    main.style.color = '#eee';
    displayedNumber.style.color = '#222';
    displayedNumber.style.backgroundColor = '#eee';
    btnTheme.style.color = '#ffff00';
    guess.style.color = '#eee';
    guess.style.borderColor = '#eee';
    guess.style.backgroundColor = '#222';

    document.querySelectorAll('.btn').forEach(function (btn) {
        btn.classList.remove('light_btn', 'light_btn_hover');
        btn.classList.add('dark_btn');

        btn.addEventListener(
            'mouseover',
            function () {
                btn.classList.remove('light_btn_hover');
                this.classList.add('dark_btn_hover')
            }
        )
        btn.addEventListener(
            'mouseleave',
            function () {
                this.classList.remove('dark_btn_hover')
            }
        )
    });


}


function setCurrentTheme(themeName) {
    if (themeName === 'dark') setDarkTheme();
    else if (themeName === 'light') setLightTheme();
}


function resetGame() {
    number = Math.trunc(Math.random() * 20) + 1;

    score = 20;
    scoreHTMl.textContent = String(score);

    setCurrentTheme(currentTheme);

    displayMessage('Start guessing...');
    guess.value = '';
    displayedNumber.textContent = '?';
    displayedNumber.style.width = '15rem';
}


guess.addEventListener(
    'keydown',
    function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            btnCheck.click();
        }
        else if (event.key === 'Escape') {
            event.preventDefault();
            this.blur();
        }
    }
)

btnCheck.addEventListener(
    'click',
    function () {
        const userGuess = Number(guess.value);

        // Player didn't enter the guess
        if (!userGuess) displayMessage('⛔ No number!');

        // Player guess is not in the range [1, 20]
        else if (userGuess < 1 || userGuess > 20) displayMessage('⛔ Number out of range!');

        // Player wins
        else if (userGuess === number) {
            displayMessage('🎉 Correct Number!');

            if (score > highscore) {
                highscore = score;
                highscoreHTMl.textContent = highscore;
            }

            displayedNumber.textContent = String(number);
            displayedNumber.style.width = '30rem';
            body.style.backgroundColor = '#60b347';
        }

        // If user guess is wrong
        else if (userGuess !== number) {
            if (score > 1) {
                displayMessage(userGuess > number ? '📈 Too high!' : '📉 Too low!');
                score -= 1;
                scoreHTMl.textContent = score;
            } else {
                scoreHTMl.textContent = '0';
                displayMessage('😪 You lost!');
            }
        }
    }
);

btnAgain.addEventListener('click', resetGame);

btnTheme.addEventListener('click', switchTheme);





