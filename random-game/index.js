const setGame = () => {
    let area = [
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [4, 0, 4, 0],
        [0, 8, 0, 0]
    ]

    area.forEach((row, rowIndex) => {
        row.forEach((elem, elemIndex) => {
            let tile = document.createElement("div");
            let num = area[rowIndex][elemIndex];   
            tile.innerText = "";    
            tile.classList.value = "";
            tile.classList.add("tile");
            tile.classList.add(`_${num}`);
            tile.innerText = (num > 0) ? num : '';
            document.querySelector(".area").append(tile);
        });        
    });
}

setGame();