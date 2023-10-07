const buttonBack = document.querySelector(".back");

let area= [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let previousPosition;

const updateBoard = () => {
    document.querySelector(".area").innerText = "";

    area.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            let cell = document.createElement("div"); 
            updateCell(cell, rowIndex, colIndex);
            document.querySelector(".area").append(cell);
        });        
    });
}
updateBoard();

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
addTwoOrFour();
addTwoOrFour();

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
            row[index + 1] = 0;            
        }
    });

    row = deleteZeros(row);

    while (row.length < 4) {
        row.push(0);
    }

    return row;
}

function moveLeft() {
    if (JSON.stringify(previousPosition) !== JSON.stringify(area)) {
        previousPosition = area.map(row => [...row]);
    }
    area.forEach((row, rowIndex) => {
        area[rowIndex] = mergeCells(row);
    });
    updateBoard();
}

function moveRight() {
    if (JSON.stringify(previousPosition) !== JSON.stringify(area)) {
        previousPosition = area.map(row => [...row]);
    }
    area.forEach((row, rowIndex) => { 
        area[rowIndex] = area[rowIndex].reverse();
        area[rowIndex] = mergeCells(row);
        area[rowIndex] = area[rowIndex].reverse();
    });
    updateBoard();
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
    if (JSON.stringify(previousPosition) !== JSON.stringify(area)) {
        previousPosition = area;
    }
    rotateAreaCounterclockwise90deg();
    area.forEach((row, rowIndex) => { 
        area[rowIndex] = mergeCells(row);
    });
    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    updateBoard();
}

function moveDown() {
    if (JSON.stringify(previousPosition) !== JSON.stringify(area)) {
        previousPosition = area;
    }
    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    rotateAreaCounterclockwise90deg();
    area.forEach((row, rowIndex) => { 
        area[rowIndex] = mergeCells(row);
    });
    rotateAreaCounterclockwise90deg();
    updateBoard();
}

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        moveLeft();
        addTwoOrFour();
    } else if (e.code === "ArrowRight") {
        moveRight();
        addTwoOrFour();
    } else if (e.code === "ArrowUp") {
        moveUp();
        addTwoOrFour();
    } else if (e.code === "ArrowDown") {
        moveDown();
        addTwoOrFour();
    }
})

buttonBack.addEventListener("click", (e) => {
    area = previousPosition.map(row => [...row]);
    updateBoard();
})