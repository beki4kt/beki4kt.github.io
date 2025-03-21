const mainBoard = document.querySelector('#main-board .board-numbers');
const playerBoard = document.querySelector('#player-board .board-numbers');
const timerDisplay = document.getElementById('timer');
const calledNumberDisplay = document.getElementById('called-number');
const currentBoardNumberDisplay = document.getElementById('current-board-number');

let timer = 28;
let calledNumbers = [];
let playerCard = [];
let mainCard = [];

function generateBingoCard() {
    const card = {};
    const ranges = { B: [1, 15], I: [16, 30], N: [31, 45], G: [46, 60], O: [61, 75] };
    for (const column in ranges) {
        card[column] = [];
        const [min, max] = ranges[column];
        while (card[column].length < 15) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!card[column].includes(num)) {
                card[column].push(num);
            }
        }
    }
    return card;
}

function displayBingoCard(card, boardElement) {
    boardElement.innerHTML = '';
    for (const column in card) {
        card[column].forEach(num => {
            const cell = document.createElement('div');
            cell.textContent = num;
            boardElement.appendChild(cell);
        });
    }
}

function updateTimer() {
    if (timer > 0) {
        timer--;
        timerDisplay.textContent = timer;
    } else {
        clearInterval(timerInterval);
        callBingoNumber();
    }
}

function callBingoNumber() {
    let num;
    do {
        num = Math.floor(Math.random() * 75) + 1;
    } while (calledNumbers.includes(num));
    calledNumbers.push(num);
    calledNumberDisplay.textContent = num;
    currentBoardNumberDisplay.textContent = num;

    // Highlight called number on player board
    const playerCells = playerBoard.querySelectorAll('div');
    playerCells.forEach(cell => {
        if (parseInt(cell.textContent) === num) {
            cell.classList.add('selected');
        }
    });

    timer = 28; // Reset timer
}

function checkBingo() {
    // Implement bingo win checking logic here
    alert("Bingo check not implemented yet.");
}

// Generate and display bingo cards
mainCard = generateBingoCard();
playerCard = generateBingoCard();
displayBingoCard(mainCard, mainBoard);
displayBingoCard(playerCard, playerBoard);

// Start timer
const timerInterval = setInterval(updateTimer, 1000);

//