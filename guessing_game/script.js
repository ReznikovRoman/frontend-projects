'use strict';

let number = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;
let currentTheme = 'dark';

function displayMessage(message) {
    document.querySelector('.message').textContent = message;
}

function setLightTheme() {
    document.querySelector('body').style.color = '#222';
    document.querySelector('body').style.backgroundColor = '#88afff5c';
    document.querySelector('main').style.color = '#222';
    document.querySelector('.number').style.color = '#eee';
    document.querySelector('.number').style.border = '#222';
    document.querySelector('.number').style.backgroundColor = '#222';
    document.querySelector('.theme_icon').style.color = '#222';
    document.querySelector('.guess').style.color = '#222';
    document.querySelector('.guess').style.backgroundColor = '#eee';
    document.querySelector('.guess').style.borderColor = '#222';

    document.querySelectorAll('.btn').forEach(function (btn) {
        btn.classList.remove('dark_btn');
        btn.classList.remove('dark_btn_hover');
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
    document.querySelector('body').style.color = '#eeeeee';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('main').style.color = '#eee';
    document.querySelector('.number').style.color = '#222';
    document.querySelector('.number').style.backgroundColor = '#eee';
    document.querySelector('.theme_icon').style.color = '#ffff00';
    document.querySelector('.guess').style.color = '#eee';
    document.querySelector('.guess').style.borderColor = '#eee';
    document.querySelector('.guess').style.backgroundColor = '#222';

    document.querySelectorAll('.btn').forEach(function (btn) {
        btn.classList.remove('light_btn');
        btn.classList.remove('light_btn_hover');
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
    document.querySelector('.score').textContent = String(score);

    setCurrentTheme(currentTheme);

    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
}


document.querySelector('.guess').addEventListener(
    'keydown',
    function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.querySelector('.check').click();
        }
        else if (event.key === 'Escape') {
            event.preventDefault();
            this.blur();
        }
    }
)


document.querySelector('.check').addEventListener(
    'click',
    function () {
        const userGuess = Number(document.querySelector('.guess').value);

        // Player didn't enter the guess
        if (!userGuess) displayMessage('⛔ No number!');

        // Player guess is not in the range [1, 20]
        else if (userGuess < 1 || userGuess > 20) displayMessage('⛔ Number out of range!');

        // Player wins
        else if (userGuess === number) {
            displayMessage('🎉 Correct Number!');

            if (score > highscore) {
                highscore = score;
                document.querySelector('.highscore').textContent = highscore;
            }

            document.querySelector('.number').textContent = String(number);
            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').style.width = '30rem';
        }

        // If user guess is wrong
        else if (userGuess !== number) {
            if (score > 1) {
                displayMessage(userGuess > number ? '📈 Too high!' : '📉 Too low!');
                score -= 1;
                document.querySelector('.score').textContent = score;
            } else {
                document.querySelector('.score').textContent = '0';
                displayMessage('😪 You lost!');
            }
        }
    }
);


document.querySelector('.again').addEventListener(
    'click',
    resetGame,
)


document.querySelector('.theme_icon').addEventListener(
    'click',
    function () {
        if (currentTheme === 'dark') {
            currentTheme = 'light';
            setLightTheme();
        } else {
            currentTheme = 'dark';
            setDarkTheme();
        }
    }
)





