const newGameButtonEl = document.getElementById("btn-new-game");
const sendAnswersButtonEl = document.getElementById("btn-send-answers");
const gameBottomEl = document.getElementById("game-bottom");
const userAnswerCells = document.querySelectorAll(".user-answer");
const scoreEl = document.getElementById("score");

let randomNumbers;

newGameButtonEl.addEventListener("click", function() {
    scoreEl.innerText = "";
    for(let i = 0; i < userAnswerCells.length; i++) {
        userAnswerCells[i].value = "";
    }
    gameBottomEl.style.display = "none";

    randomNumbers = generateNRandomNumbers(5, 1, 10);

    const randomNumberCells = document.querySelectorAll(".random-number");
    showNumbersForSecondsAndAllowAnswer(randomNumberCells, randomNumbers, 10, gameBottomEl);
});

sendAnswersButtonEl.addEventListener("click", function() {
    let userAnswers = getNumbersFromCells(userAnswerCells);

    let rightNumbers = getEqualNumbers(userAnswers, randomNumbers);
    scoreEl.innerHTML = "Numeri indovinati: " + rightNumbers.toString() + "<br>Punteggio: " + rightNumbers.length;
});


// --------------------------- FUNCTIONS --------------------------- //

function getEqualNumbers(numbers1, mumbers2) {
    let equalNumbers = [];

    for(let i = 0; i < numbers1.length; i++) {
        if(numbers1[i] == mumbers2[i]) {
            equalNumbers.push(numbers1[i]);
        }
    }

    return equalNumbers;
}

function showNumbersForSecondsAndAllowAnswer(numberCells, numbers, seconds, answersEl) {
    for(let i = 0; i < numberCells.length; i++) {
        numberCells[i].innerText = numbers[i];
    }

    setTimeout(function() {
        for(let i = 0; i < numberCells.length; i++) {
            numberCells[i].innerText = "";
        }

        answersEl.style.display = "flex";
    }, seconds * 1000);
}

function getNumbersFromCells(numberCells) {
    let numbers = [];

    for(let i = 0; i < numberCells.length; i++) {
        numbers.push(Number(numberCells[i].value));
    }

    return numbers;
}

/**
 * Genera n numeri pseudo casuali compresi tra min e max.
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function generateNRandomNumbers(n, min, max) {
    let randomNumbers = [];

    while(randomNumbers.length < n) {
        let randomNumber = generateRandomNumber(min, max);

        if(!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }

    return randomNumbers;
}

/**
 * Genera un numero pseudo casuale compreso tra min e max.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}