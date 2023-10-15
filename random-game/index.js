const buttonBack = document.querySelector(".back");
const buttonRestart = document.querySelector(".restart");
const gameWrapper = document.querySelector(".game-wrapper");
const playingField = document.querySelector(".area");
const currentScore = document.querySelector(".current-score");
const bestScore = document.querySelector(".best-score");
const records = document.querySelector(".records");
const gameOverScore = document.querySelector(".game-over-score");
const carImg = document.querySelector(".car-img");

let previousPosition = 0;
let currentScoreVariable = 0;
let previousScoreVariable = 0;
let bestScoreVariable;
let topTenResults = [];
let area = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const getLocalStorage = () => {
  area =
    JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 currentPosition")) ||
    area;
  previousPosition =
    JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 previousPosition")) ||
    previousPosition;
  currentScoreVariable =
    JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 currentScore")) ||
    currentScoreVariable;
  previousScoreVariable =
    JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 previousScore")) ||
    previousScoreVariable;
  topTenResults =
    JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 topTenResults")) ||
    topTenResults;
};
getLocalStorage();

const setLocalStorage = () => {
  localStorage.setItem(
    "(づ ◕‿◕ )づ 2048 currentPosition",
    JSON.stringify(area),
  );
  localStorage.setItem(
    "(づ ◕‿◕ )づ 2048 previousPosition",
    JSON.stringify(previousPosition),
  );
  localStorage.setItem(
    "(づ ◕‿◕ )づ 2048 currentScore",
    JSON.stringify(currentScoreVariable),
  );
  localStorage.setItem(
    "(づ ◕‿◕ )づ 2048 previousScore",
    JSON.stringify(previousScoreVariable),
  );
  localStorage.setItem(
    "(づ ◕‿◕ )づ 2048 topTenResults",
    JSON.stringify(topTenResults),
  );
};
setLocalStorage();

document.addEventListener("load", function () {
  getLocalStorage();
  updateBoard();
});

document.addEventListener("beforeunload", function () {
  setLocalStorage();
});

function updateTopTenResults() {
  topTenResults = topTenResults.sort((a, b) => b - a);
  topTenResults =
    topTenResults.length >= 10 ? topTenResults.slice(0, 10) : topTenResults;
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
  updateCarImg();
}
updateBoard();

const updateScore = () => {
  updateTopTenResults();
  bestScoreVariable = topTenResults[0] || 0;
  bestScoreVariable =
    bestScoreVariable > currentScoreVariable
      ? bestScoreVariable
      : currentScoreVariable;
  currentScore.innerHTML = `score:<br>${currentScoreVariable} $`;
  bestScore.innerHTML = `best:<br>${bestScoreVariable} $`;
  gameOverScore.innerText = `score: ${currentScoreVariable} $`;

  records.innerText = "";
  topTenResults.forEach((item) => {
    let record = document.createElement("div");
    record.innerText = `${item} $`;
    records.append(record);
  });
};
updateScore();

function updateCarImg() {
  let maxNum = 2;

  area.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      const num = area[rowIndex][colIndex];
      maxNum = num > maxNum ? num : maxNum;
    });
  });
  carImg.style.backgroundImage = `url('./src/jpg/${maxNum}.jpg')`;
}

const findEmptyCells = () => [].concat(...area).includes(0);

const addTwoOrFour = () => {
  if (
    !findEmptyCells() ||
    JSON.stringify(previousPosition) === JSON.stringify(area)
  ) {
    return;
  }

  let stop = false;
  while (!stop) {
    let randomRow = Math.floor(Math.random() * 4);
    let randomCol = Math.floor(Math.random() * 4);
    let twoOrFour = Math.random() > 0.9 ? 4 : 2;

    if (area[randomRow][randomCol] == 0) {
      area[randomRow][randomCol] = twoOrFour;
      updateBoard();
      stop = true;
    }
  }
};

const isTheFieldEmpty = () => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (area[r][c] !== 0) {
        return false;
      }
    }
  }
  return true;
};

if (isTheFieldEmpty()) {
  addTwoOrFour();
  addTwoOrFour();
}

function checkGameOver() {
  if (findEmptyCells()) return false;

  for (let r = 0; r <= 3; r++) {
    for (let c = 0; c <= 3; c++) {
      if (r < 3) {
        if (area[r][c] === area[r + 1][c]) return false;
      }
      if (c < 3) {
        if (area[r][c] === area[r][c + 1]) return false;
      }
    }
  }
  return true;
}

function toggleGameOver() {
  const gameOver = document.querySelector(".game-over");

  if (checkGameOver()) {
    gameOver.classList.add("game-over-active");
    playGameOverSound();
  } else {
    gameOver.classList.remove("game-over-active");
  }
}

function updateCell(cell, rowIndex, colIndex) {
  const num = area[rowIndex][colIndex];
  cell.innerText = "";
  cell.classList.value = "";
  cell.classList.add("cell");
  cell.classList.add(`${rowIndex}-${colIndex}`);
  cell.classList.add(`_${num}`);
  cell.innerText = num > 0 ? num : "";
}

const deleteZeros = (row) => row.filter((num) => num != 0);

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
};

const updateGame = () => {
  addTwoOrFour();
  updateBoard();
  updateTopTenResults();
  updateScore();
  setLocalStorage();
};

function playMotionSound() {
  const randomIndex = Math.floor(Math.random() * 10) + 1;
  const audio = new Audio(`./src/audio/move${randomIndex}.mp3`);
  audio.play();
}

function playGameOverSound() {
  const randomIndex = Math.floor(Math.random() * 2) + 1;
  const audio = new Audio(`./src/audio/game-over${randomIndex}.mp3`);
  audio.play();
}

function moveLeft() {
  toggleGameOver();
  if (checkGameOver()) {
    return;
  }
  const cachePreviousPosition = previousPosition;
  const cachePreviousScore = previousScoreVariable;
  previousPosition = previousPosition;
  previousPosition = area.map((row) => [...row]);
  previousScoreVariable = currentScoreVariable;

  area.forEach((row, rowIndex) => {
    area[rowIndex] = mergeCells(row);
  });

  updateGame();
  toggleButtonBack();
  if (JSON.stringify(previousPosition) === JSON.stringify(area)) {
    previousPosition = cachePreviousPosition;
    previousScoreVariable = cachePreviousScore;
    buttonBack.classList.remove("back-inactive");
  } else {
    playMotionSound();
  }
}

function moveRight() {
  toggleGameOver();
  if (checkGameOver()) {
    return;
  }
  const cachePreviousPosition = previousPosition;
  const cachePreviousScore = previousScoreVariable;
  previousPosition = area.map((row) => [...row]);
  previousScoreVariable = currentScoreVariable;

  area.forEach((row, rowIndex) => {
    area[rowIndex] = area[rowIndex].reverse();
    area[rowIndex] = mergeCells(row);
    area[rowIndex] = area[rowIndex].reverse();
  });
  updateGame();
  toggleButtonBack();
  if (JSON.stringify(previousPosition) === JSON.stringify(area)) {
    previousPosition = cachePreviousPosition;
    previousScoreVariable = cachePreviousScore;
    buttonBack.classList.remove("back-inactive");
  } else {
    playMotionSound();
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
};

function moveUp() {
  toggleGameOver();
  if (checkGameOver()) {
    return;
  }
  const cachePreviousPosition = previousPosition;
  const cachePreviousScore = previousScoreVariable;
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
  toggleButtonBack();
  if (JSON.stringify(previousPosition) === JSON.stringify(area)) {
    previousPosition = cachePreviousPosition;
    previousScoreVariable = cachePreviousScore;
    buttonBack.classList.remove("back-inactive");
  } else {
    playMotionSound();
  }
}

function moveDown() {
  toggleGameOver();
  if (checkGameOver()) {
    return;
  }
  const cachePreviousPosition = previousPosition;
  const cachePreviousScore = previousScoreVariable;
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
  toggleButtonBack();
  if (JSON.stringify(previousPosition) === JSON.stringify(area)) {
    previousPosition = cachePreviousPosition;
    previousScoreVariable = cachePreviousScore;
    buttonBack.classList.remove("back-inactive");
  } else {
    playMotionSound();
  }
}

function toggleButtonBack() {
  if (JSON.stringify(previousPosition) === JSON.stringify(area)) {
    buttonBack.classList.add("back-inactive");
  } else {
    buttonBack.classList.remove("back-inactive");
  }
}
buttonBack.classList.remove("back-inactive");
if (
  JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 previousPosition")) ===
  JSON.parse(localStorage.getItem("(づ ◕‿◕ )づ 2048 previousPosition"))
) {
  buttonBack.classList.add("back-inactive");
}

buttonBack.addEventListener("click", (e) => {
  if (previousPosition) {
    updateBoard();
    updateTopTenResults();
    updateScore();
    setLocalStorage();
    currentScoreVariable = previousScoreVariable;
    area = previousPosition.map((row) => [...row]);
    setLocalStorage();
    updateBoard();
    if (!checkGameOver()) {
      toggleGameOver();
    }
  }
  buttonBack.classList.add("back-inactive");
});

buttonRestart.addEventListener("click", (e) => {
  if (currentScoreVariable) {
    topTenResults.push(currentScoreVariable);
  }
  updateTopTenResults();
  area = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  currentScoreVariable = 0;
  previousPosition = 0;
  previousScoreVariable = 0;
  setLocalStorage();
  location.reload();
});

carImg.addEventListener("click", () => {
  gameWrapper.classList.toggle("game-wrapper-reverse");
});

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code === "ArrowLeft") {
    moveLeft();
  } else if (e.code === "ArrowRight") {
    moveRight();
  } else if (e.code === "ArrowUp") {
    moveUp();
  } else if (e.code === "ArrowDown") {
    moveDown();
  }
});

// Touch Control Start ===========================

let touchStartX;
let touchStartY;

playingField.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

playingField.addEventListener("touchend", (e) => {
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

playingField.addEventListener("touchmove", (e) => {
  e.preventDefault();
});

// Touch Control End ===========================

// cheat code easter egg

const mercedesLogo = document.querySelector(".mercedes-logo");

let cheatStartX = 0;
let cheatStartY = 0;

mercedesLogo.addEventListener("touchstart", (event) => {
    cheatStartX = event.touches[0].clientX;
    cheatStartY = event.touches[0].clientY;
});

mercedesLogo.addEventListener("touchend", (event) => {
  const cheatEndX = event.changedTouches[0].clientX;
  const cheatEndY = event.changedTouches[0].clientY;

  const deltaX = cheatEndX - cheatStartX;
  const deltaY = cheatEndY - cheatStartY;

  if (deltaX >= 200 && deltaY >= 420) {
    area = [
        [4, 4, 8, 16],
        [256, 128, 64, 32],
        [512, 1024, 2048, 4096],
        [65536, 32768, 16384, 8192],
      ];
      addTwoOrFour();
      updateBoard();
  }
});

// easter egg clear local storage 

let localStorageStartX = 0;
let localStorageStartY = 0;

buttonRestart.addEventListener("touchstart", (event) => {
  localStorageStartX = event.touches[0].clientX;
  localStorageStartY = event.touches[0].clientY;
});

buttonRestart.addEventListener("touchend", (event) => {
  const localStorageEndX = event.changedTouches[0].clientX;
  const localStorageEndY = event.changedTouches[0].clientY;

  const deltaX = localStorageEndX - localStorageStartX;
  const deltaY = localStorageEndY - localStorageStartY;

  if (deltaX <= -200 && deltaY >= 420) {
    localStorage.clear();
    location. reload();
  }
});

console.log(
  "60 из 60 баллов\n- Вёрстка +10 реализован интерфейс игры +5\n- В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n- Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10\n- Реализовано завершение игры при достижении игровой цели +10\n- По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10\n- Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10\n- Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10\n- Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\nвысокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо"
);

console.log(
  "\n\n============= В этой игре есть чит код: =============\n\nCheat code easter egg: Lift the car up.\nDraw a two all over the screen, starting with the Mercedes emblem.  (touch control).\n\nTo reset top records to factory settings: starting from the “reboot” button,\ndraw a two in a mirror image across the entire screen." 
);