let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };

// Вопросы и ответы (20 уникальных)
const questions = [
    { q: "Какой цвет у неба?", a: ["Синий", "Зелёный", "Красный"], correct: 0 },
    { q: "Сколько ног у паука?", a: ["6", "8", "10"], correct: 1 },
    { q: "Какой сейчас год?", a: ["2023", "2024", "2025"], correct: 1 },
    { q: "Что тяжелее: килограмм железа или килограмм пуха?", a: ["Железо", "Пух", "Одинаково"], correct: 2 },
    { q: "Столица Франции?", a: ["Лондон", "Париж", "Берлин"], correct: 1 },
    { q: "Сколько букв в слове 'яблоко'?", a: ["5", "6", "7"], correct: 1 },
    { q: "Как называется самая длинная река в мире?", a: ["Амазонка", "Нил", "Волга"], correct: 0 },
    { q: "Какое число идёт после 99?", a: ["98", "100", "101"], correct: 1 },
    { q: "Что из этого – млекопитающее?", a: ["Дельфин", "Акула", "Окунь"], correct: 0 },
    { q: "Какое море самое солёное?", a: ["Чёрное", "Средиземное", "Мёртвое"], correct: 2 },
    { q: "Сколько планет в Солнечной системе?", a: ["7", "8", "9"], correct: 1 },
    { q: "Сколько пальцев на руке?", a: ["4", "5", "6"], correct: 1 },
    { q: "Сколько континентов на Земле?", a: ["5", "6", "7"], correct: 2 },
    { q: "Сколько глаз у паука?", a: ["2", "4", "8"], correct: 2 },
    { q: "Какой металл жидкий при комнатной температуре?", a: ["Ртуть", "Золото", "Железо"], correct: 0 },
    { q: "Как называется столица Японии?", a: ["Токио", "Сеул", "Пекин"], correct: 0 },
    { q: "Кто написал 'Война и мир'?", a: ["Достоевский", "Толстой", "Пушкин"], correct: 1 },
    { q: "Какой сейчас месяц?", a: ["Январь", "Февраль", "Март"], correct: 1 },
    { q: "Какой газ мы вдыхаем?", a: ["Кислород", "Азот", "Углекислый газ"], correct: 0 },
    { q: "Как называется самый высокий горный пик?", a: ["Эльбрус", "Килиманджаро", "Эверест"], correct: 2 }
];

// Копия массива для работы
let availableQuestions = [...questions];

function generateGrid() {
    let grid = document.getElementById("gameGrid");
    grid.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("td");
            let index = i * 5 + j;
            cell.textContent = (index + 1) * 5;
            cell.dataset.index = index;
            cell.onclick = () => openQuestion(index);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

// Открытие вопроса
let currentQuestionIndex = null;

function openQuestion(index) {
    if (!availableQuestions.length) return; // Если вопросы закончились - выход

    currentQuestionIndex = index;

    let questionData = availableQuestions.splice(0, 1)[0]; // Берём первый вопрос из доступных

    document.getElementById("questionText").textContent = questionData.q;
    let answersContainer = document.getElementById("answersContainer");
    answersContainer.innerHTML = "";

    questionData.a.forEach((answer, i) => {
        let btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(i === questionData.correct);
        answersContainer.appendChild(btn);
    });

    document.getElementById("questionModal").style.display = "flex";
}

// Проверка ответа
function checkAnswer(correct) {
    let cells = document.querySelectorAll(".grid td");
    let answeredCell = cells[currentQuestionIndex];

    if (correct) {
        scores[currentPlayer] += 10;
        answeredCell.classList.add("correct");
    } else {
        answeredCell.classList.add("wrong");
    }

    answeredCell.onclick = null;

    document.getElementById(`score${currentPlayer}`).textContent = scores[currentPlayer];

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById("currentPlayer").textContent = document.getElementById(`player${currentPlayer}Name`).textContent;

    document.getElementById("questionModal").style.display = "none";

    checkGameEnd();
}

// Запуск игры
function startGame() {
    let player1 = document.getElementById("name1").value.trim() || "Игрок 1";
    let player2 = document.getElementById("name2").value.trim() || "Игрок 2";

    document.getElementById("player1Name").textContent = player1;
    document.getElementById("player2Name").textContent = player2;
    document.getElementById("currentPlayer").textContent = player1;

    currentPlayer = 1;
    document.querySelector(".player-input").style.display = "none";
}

function checkGameEnd() {
    let answeredCells = document.querySelectorAll(".correct, .wrong").length;
    let totalCells = document.querySelectorAll(".grid td").length;

    if (answeredCells === totalCells) {
        let winnerText = "";
        if (scores[1] > scores[2]) {
            winnerText = `🎉 Победил ${document.getElementById("player1Name").textContent} 🏆`;
        } else if (scores[2] > scores[1]) {
            winnerText = `🎉 Победил ${document.getElementById("player2Name").textContent} 🏆`;
        } else {
            winnerText = "🤝 Ничья!";
        }

        document.getElementById("winnerText").innerHTML = winnerText;
        document.getElementById("winnerModal").style.display = "flex";
    }
}

function restartGame() {
    document.querySelector(".player-input").style.display = "flex";

    document.getElementById("player1Name").textContent = "Игрок 1";
    document.getElementById("player2Name").textContent = "Игрок 2";
    document.getElementById("name1").value = "";
    document.getElementById("name2").value = "";

    scores = { 1: 0, 2: 0 };
    currentPlayer = 1;
    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("currentPlayer").textContent = "";

    availableQuestions = [...questions]; // Возвращаем все вопросы

    document.querySelectorAll(".grid td").forEach(cell => {
        cell.classList.remove("correct", "wrong");
        cell.onclick = () => openQuestion(parseInt(cell.dataset.index));
    });

    document.getElementById("winnerModal").style.display = "none";
}

generateGrid();
