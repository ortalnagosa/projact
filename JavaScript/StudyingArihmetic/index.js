let currentLevel = 1;
let correctAnswers = 0; 
let incorrectAnswers = 0;
let currentProblemIndex = 0; 
let currentProblems = [];
let currentProblem; 

const operators = ['+', '-', '*', '/']; 

function getRange(level) {
    if (level === 1) {
        return 5;
    } else if (level === 2) {
        return 10;
    } else {
        return 20;
    }
}

function isValidProblem(num1, num2, operator, answer) {
    if (answer < 0 || !Number.isInteger(answer)) return false; 
    if (operator === '/' && num2 === 0) return false; 
    if (operator === '/' && num1 % num2 !== 0) return false;
    return true;
}

function generateProblem(level) {
    const range = getRange(level);

    let num1 = Math.floor(Math.random() * range) + 1;
    let num2 = Math.floor(Math.random() * range) + 1;
    let operator = operators[Math.floor(Math.random() * operators.length)];
    let answer;

    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = num2 !== 0 && num1 % num2 === 0 ? num1 / num2 : null;
            break;
    }

    if (!isValidProblem(num1, num2, operator, answer)) {
        return generateProblem(level);
    }

    return { question: `${num1} ${operator} ${num2} =`, correctAnswer: answer };
}

function checkAnswer() {
    const userAnswer = Number(document.getElementById('answerInput').value);
    const correctAnswer = currentProblem.correctAnswer;

    if (userAnswer === correctAnswer) {
        correctAnswers++;
        document.getElementById('resultMessage').textContent = "נכון!";
        document.getElementById('resultMessage').style.color = 'green';
    } else {
        incorrectAnswers++;
        document.getElementById('resultMessage').textContent = "לא נכון!";
        document.getElementById('resultMessage').style.color = 'red';
    }

    currentProblemIndex++;

    document.getElementById('correctAnswers').textContent = `תשובות נכונות: ${correctAnswers}`;
    document.getElementById('incorrectAnswers').textContent = `תשובות שגויות: ${incorrectAnswers}`;

    if (currentProblemIndex < 10) {
        currentProblem = generateProblem(currentLevel);
        document.getElementById('problem').textContent = currentProblem.question;
    } else {
        endLevel();
    }

    document.getElementById('answerInput').value = ''; 
}

function endLevel() {
    if (correctAnswers >= 7) {
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".modal-text").textContent = ` כל הכבוד !! עברת לשלב הבא`;

        currentLevel++;
    } else {
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".modal-text").textContent = "לא ענית נכון :( , נסה שוב כדי לעבור לשלב הבא";
    }

    correctAnswers = 0;
    incorrectAnswers = 0;
    currentProblemIndex = 0;

    setTimeout(startNewLevel, 2000); 
}

document.getElementById("close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";

  });


function startNewLevel() {
    if (currentLevel > 3) {
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".modal-text").textContent = ` כל הכבוד !! עברת את כל השלבים!!`;
        document.getElementById("title1").style.display = "none";
        document.getElementById("answerInput").style.display="none";
        document.getElementById("checkButton").style.display="none";
        document.getElementById('problem').textContent = '';
        return;
    }

    currentProblem = generateProblem(currentLevel);
    document.getElementById('problem').textContent = currentProblem.question;
    document.getElementById('levelStatus').textContent = `שלב ${currentLevel}`;
    document.getElementById('correctAnswers').textContent = `תשובות נכונות: 0`;
    document.getElementById('incorrectAnswers').textContent = `תשובות שגויות: 0`;
}

startNewLevel();
document.getElementById('checkButton').addEventListener('click', checkAnswer);

