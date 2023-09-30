const inputSearch = document.querySelector(".input-search");
const btnClose = document.querySelector(".button-close");
const btnSearch = document.querySelector(".button-search");
const delimiter = document.querySelector(".delimiter");
const mainWrapper = document.querySelector(".main-wrapper");
const iconsSearchWrapper = document.querySelector(".icons-search-wrapper");
const picOne = document.querySelector(".pic-1");
const picTwo = document.querySelector(".pic-2");
const picThree = document.querySelector(".pic-3");
const picFour = document.querySelector(".pic-4");
const fullscreenWrapper = document.querySelector(".fullscreen-wrapper");
const fullscreenImg = document.querySelector(".fullscreen-img");
const loading = document.querySelector(".loading");
let previousSearchQuery = "";

const addBtnClose = () => {
  btnClose.classList.add("add-button-close");
  delimiter.classList.add("add-delimiter");
};

const removeBtnClose = () => {
  btnClose.classList.remove("add-button-close");
  delimiter.classList.remove("add-delimiter");
};

function toggleBtnClose() {
  inputSearch.value ? addBtnClose() : removeBtnClose();
}

inputSearch.addEventListener("input", toggleBtnClose);

iconsSearchWrapper.addEventListener("click", (e) => inputSearch.focus());

btnClose.addEventListener("click", (e) => {
  inputSearch.focus();
  inputSearch.value = "";
  removeBtnClose();
});

function search() {
  if (!inputSearch.value) {
    inputSearch.focus();
  } else {
    if (previousSearchQuery !== inputSearch.value.trim().toLowerCase()) {
      updateImages();
      previousSearchQuery = inputSearch.value.trim().toLowerCase();
    }
  }
}

btnSearch.addEventListener("click", search);

function handleEnter(event) {
  if (event.key === "Enter") {
    search();
  }
}
inputSearch.addEventListener("keydown", handleEnter);

async function updateImages() {
  const request = inputSearch.value.trim() || `mountains`;
  const url = `https://api.unsplash.com/search/photos/?orientation=squarish&query=${encodeURIComponent(
    request,
  )}&per_page=30&client_id=OZrVqG5ZAwYMeLk6pRK7Q6W23rZM54vySCz2pFCibEc`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    showImages(data);
    updateLogo(data);
  }
}
updateImages();

function showImages(data) {
  mainWrapper.innerHTML = "";
  const imgWrappers = [];

  data.results.forEach((item) => {
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "img-wrapper";
    imgWrapper.style.backgroundImage = `url("${item.urls.small}")`;
    imgWrapper.style.backgroundSize = "cover";
    imgWrappers.push(imgWrapper);
    mainWrapper.append(imgWrapper);
  });

  imgWrappers.forEach((item, index) => {
    item.addEventListener("click", () => {
      fullscreenImg.style.backgroundImage = `url('${data.results[index].urls.full}')`;
      fullscreenWrapper.classList.add("fullscreen-wrapper-active");
      document.body.classList.add("body-scroll-stop");
    });
  });
}

fullscreenWrapper.addEventListener("click", () => {
  fullscreenWrapper.classList.remove("fullscreen-wrapper-active"); 
  document.body.classList.remove("body-scroll-stop");
});

function updateLogo(data) {
  picOne.style.backgroundImage = `url('${data.results[0].urls.thumb}')`;
  picTwo.style.backgroundImage = `url('${data.results[1].urls.thumb}')`;
  picThree.style.backgroundImage = `url('${data.results[2].urls.thumb}')`;
  picFour.style.backgroundImage = `url('${data.results[3].urls.thumb}')`;
}