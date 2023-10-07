let area= [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [8, 8, 8, 8],
    [4, 4, 8, 8]
];

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

function updateCell(cell, rowIndex, colIndex) {
    const num = area[rowIndex][colIndex];
    cell.innerText = "";    
    cell.classList.value = "";
    cell.classList.add("cell");
    cell.classList.add(`${rowIndex}-${colIndex}`);
    cell.classList.add(`_${num}`);
    cell.innerText = (num > 0) ? num : '';
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
    area.forEach((row, rowIndex) => {
        area[rowIndex] = mergeCells(row);
    });
    updateBoard();
}

function moveRight() {
    area.forEach((row, rowIndex) => { 
        area[rowIndex] = area[rowIndex].reverse();
        area[rowIndex] = mergeCells(row);
        area[rowIndex] = area[rowIndex].reverse();
    });
    updateBoard();
}

const rotateMatrixCounterclockwise90deg = () => {
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
    rotateMatrixCounterclockwise90deg();
    area.forEach((row, rowIndex) => { 
        area[rowIndex] = mergeCells(row);
    });
    rotateMatrixCounterclockwise90deg();
    rotateMatrixCounterclockwise90deg();
    rotateMatrixCounterclockwise90deg();
    updateBoard();
}

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        moveLeft();
    }
})

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
        moveRight();
    }
})

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        moveUp();
    }
})