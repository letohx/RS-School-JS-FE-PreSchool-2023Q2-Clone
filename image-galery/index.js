const inputSearch = document.querySelector(".input-search");
const btnClose = document.querySelector(".button-close");
const btnSearch = document.querySelector(".button-search");
const delimiter = document.querySelector(".delimiter");
const mainWrapper = document.querySelector(".main-wrapper");
let previousSearchQuery = '';



const addBtnClose = () => {
    btnClose.classList.add('add-button-close');
    delimiter.classList.add('add-delimiter');
}

const removeBtnClose = () => {
    btnClose.classList.remove('add-button-close');
    delimiter.classList.remove('add-delimiter');
}

function toggleBtnClose() {
    (inputSearch.value) ? addBtnClose() : removeBtnClose();
}

inputSearch.addEventListener('input', toggleBtnClose);

btnClose.addEventListener('click', (e) => {
    inputSearch.focus();
    inputSearch.value = '';
    removeBtnClose();
});

function search () {
    if (!inputSearch.value) {
        inputSearch.focus();
    } else {
        if (previousSearchQuery !== inputSearch.value.trim().toLowerCase()){
            updateImages();
            previousSearchQuery = inputSearch.value.trim().toLowerCase();
        }
    }
}

btnSearch.addEventListener('click', search);

function handleEnter(event) {
    if (event.key === 'Enter') {
        search();
    }
}
inputSearch.addEventListener('keydown', handleEnter);

async function updateImages() {  
    const request = inputSearch.value.trim() || `programming`;
    const url = `https://api.unsplash.com/search/photos/?orientation=squarish&query=${request}&client_id=OZrVqG5ZAwYMeLk6pRK7Q6W23rZM54vySCz2pFCibEc`;
    const res = await fetch(url);
    const data = await res.json(); 
    showImages(data);
}
updateImages();

function showImages (data) {
    mainWrapper.innerHTML = '';
    data.results.forEach((item) => {
        const img = document.createElement('img');
        img.classList.add('img')
        img.src = item.urls.regular;
        img.alt = `image`;
        mainWrapper.append(img);
    })
}