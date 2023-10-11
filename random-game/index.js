const buttonBack = document.querySelector(".back");
const buttonRestart = document.querySelector(".restart");
const playingField = document.querySelector(".area");
const currentScore = document.querySelector(".current-score");
const bestScore = document.querySelector(".best-score");
const records = document.querySelector(".records");

let previousPosition = 0;
let currentScoreVariable = 0;
let previousScoreVariable = 0;
let bestScoreVariable;
let topTenResults = [];
let area = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const getLocalStorage = () => {
    area = JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 currentPosition")) || area;
    previousPosition = JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 previousPosition")) || previousPosition;
    currentScoreVariable = JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 currentScore")) || currentScoreVariable;
    previousScoreVariable = JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 previousScore")) || previousScoreVariable;
    topTenResults = JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 topTenResults")) || topTenResults;
}
getLocalStorage();

const setLocalStorage = () => {
    localStorage.setItem("(づ ◕‿◕ )づ 2048 currentPosition", JSON.stringify(area));
    localStorage.setItem("(づ ◕‿◕ )づ 2048 previousPosition", JSON.stringify(previousPosition));
    localStorage.setItem("(づ ◕‿◕ )づ 2048 currentScore", JSON.stringify(currentScoreVariable));
    localStorage.setItem("(づ ◕‿◕ )づ 2048 previousScore", JSON.stringify(previousScoreVariable));
    localStorage.setItem("(づ ◕‿◕ )づ 2048 topTenResults", JSON.stringify(topTenResults));
}
setLocalStorage()

document.addEventListener("load", function() {
    getLocalStorage();
    updateBoard();
});

document.addEventListener("beforeunload", function() {
    setLocalStorage();
});

function updateTopTenResults () {
    topTenResults = topTenResults.sort((a, b) => b - a);
    topTenResults = topTenResults.length >= 10 ? topTenResults.slice(0, 10) : topTenResults;
}

function updateBoard() {
    playingField.innerText = "";

    area.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            let cell = document.createElement("div"); 
            updateCell(cell, rowIndex, colIndex);
            playingField.append(cell);
        });        
    });
}
updateBoard();

const updateScore = () => {
    updateTopTenResults();
    bestScoreVariable = topTenResults[0] || 0;
    bestScoreVariable = bestScoreVariable > currentScoreVariable ? bestScoreVariable : currentScoreVariable;
    currentScore.innerText = `score: ${currentScoreVariable}`
    bestScore.innerText = `best: ${bestScoreVariable}`
    records.innerText = `records: ${topTenResults}`
}
updateScore();

const findEmptyCells = () => [].concat(...area).includes(0);

const addTwoOrFour = () => {
    if (!findEmptyCells() || JSON.stringify(previousPosition) === JSON.stringify(area)) {
        return;
    };
    
    let stop = false;
    while (!stop) {
        let randomRow = Math.floor(Math.random() * 4)
        let randomCol = Math.floor(Math.random() * 4)
        let twoOrFour = (Math.random() > 0.9) ? 4 : 2;
        
        if (area[randomRow][randomCol] == 0) {
            area[randomRow][randomCol] = twoOrFour;
            updateBoard();
            stop = true;
        }
    }
}

const isTheFieldEmpty = () => {
    for (let rowIndex = 0; rowIndex < area.length; rowIndex++) {
        for (let colIndex = 0; colIndex < area[rowIndex].length; colIndex++) {
            if (area[rowIndex][colIndex] !== 0) {
                return false;
            }
        }

    }
    return true;
}

if (isTheFieldEmpty()) {
    addTwoOrFour();
    addTwoOrFour();
}

function updateCell(cell, rowIndex, colIndex) {
    const num = area[rowIndex][colIndex];
    cell.innerText = "";    
    cell.classList.value = "";
    cell.classList.add("cell");
    cell.classList.add(`${rowIndex}-${colIndex}`);
    cell.classList.add(`_${num}`);
    cell.innerText = (num > 0) ? num : "";
}

const deleteZeros = (row) => row.filter(num => num != 0);

const mergeCells = (row) => {
    row = deleteZeros(row);

    row.forEach((num, index) => {
        if (num === row[index + 1]) {
            row[index] *= 2;
            currentScoreVariable += row[index];
            row[index + 1] = 0;            
        }
    });

    row = deleteZeros(row);

    while (row.length < 4) {
        row.push(0);
    }

    return row;
}

const updateGame = () => {
    addTwoOrFour();
    updateBoard();
    updateTopTenResults();
    updateScore();
    setLocalStorage();
}

function moveLeft() {
    const cachePreviousPosition = previousPosition;
    previousPosition = area.map(row => [...row]);
    previousScoreVariable = currentScoreVariable;

    area.forEach((row, rowIndex) => {
        area[rowIndex] = mergeCells(row);
    });
    updateGame(); 
    if (JSON.stringify(previousPosition) === JSON.stringify(area))  {
        previousPosition = cachePreviousPosition;
    }  
}

function moveRight() {
    const cachePreviousPosition = previousPosition;
    previousPosition = area.map(row => [...row]);
    previousScoreVariable = currentScoreVariable;

    area.forEach((row, rowIndex) => { 
        area[rowIndex] = area[rowIndex].reverse();
        area[rowIndex] = mergeCells(row);
        area[rowIndex] = area[rowIndex].reverse();
    });
    updateGame();    
    if (JSON.stringify(previousPosition) === JSON.stringify(area))  {
        previousPosition = cachePreviousPosition;
    }  
}

const rotateAreaCounterclockwise90deg = () => {
    const rotatedMatrix = [];
    for (let c = 3; c > -1; c--) {
        const newRow = [];
        for (let r = 0; r < 4; r++) {
            newRow.push(area[r][c]);
        }
        rotatedMatrix.push(newRow);
    }
    area = rotatedMatrix;
}

function moveUp() {
    const cachePreviousPosition = previousPosition;
    previousPosition = area;
    previousScoreVariable = currentScoreVariable;

    rotateAreaCounterclockwise90deg();
    area.forEach((row, rowIndex) => { 
        area[rowIndex] = mergeCells(row);
    });
    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    updateGame();    
    if (JSON.stringify(previousPosition) === JSON.stringify(area))  {
        previousPosition = cachePreviousPosition;
    }  
}

function moveDown() {
    const cachePreviousPosition = previousPosition;
    previousPosition = area;
    previousScoreVariable = currentScoreVariable;

    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    area.forEach((row, rowIndex) => { 
        area[rowIndex] = mergeCells(row);
    });
    rotateAreaCounterclockwise90deg();
    updateGame();    
    if (JSON.stringify(previousPosition) === JSON.stringify(area))  {
        previousPosition = cachePreviousPosition;
    }  
}

buttonBack.addEventListener("click", (e) => {
    if (previousPosition) {
        updateBoard();
        updateTopTenResults();
        updateScore();
        setLocalStorage();
        currentScoreVariable = previousScoreVariable;
        area = previousPosition.map(row => [...row]);
        setLocalStorage();
        location.reload();
    }
})

buttonRestart.addEventListener("click", (e) => {
    topTenResults.push(currentScoreVariable);
    updateTopTenResults();
    area = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    currentScoreVariable = 0;
    previousPosition = 0;
    previousScoreVariable = 0;
    setLocalStorage();
    location.reload();
})

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        moveLeft();
    } else if (e.code === "ArrowRight") {
        moveRight();
    } else if (e.code === "ArrowUp") {
        moveUp();
    } else if (e.code === "ArrowDown") {
        moveDown();
    }
})

// Touch Control Start ===========================

let touchStartX;
let touchStartY;

playingField.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

playingField.addEventListener('touchend', (e) => {
  if (touchStartX && touchStartY) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -50) {
        moveLeft();
      } else if (deltaX > 50) {
        moveRight();
      }
    } else {
      if (deltaY < -50) {
        moveUp();
      } else if (deltaY > 50) {
        moveDown();
      }
    }
  }
});

playingField.addEventListener('touchmove', (e) => {
    e.preventDefault();
})

// Touch Control End ===========================

console.log(area);