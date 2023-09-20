const audio = document.querySelector('audio');
const background = document.querySelector('.background-img');
const thumbnail = document.querySelector('.thumbnail');

const title = document.querySelector('.song-title');
const artist = document.querySelector('.song-artist');

const playPrevBtn = document.querySelector('.play-prev');
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
// const playListContainer = document.querySelector('.play-list');



import playList from './playList.js';

let isPlay = false;
let playNum = 0;

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    background.src = playList[playNum].thumbnail;
    thumbnail.src = playList[playNum].thumbnail;
    title.innerHTML = playList[playNum].title;
    artist.innerHTML = playList[playNum].artist;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    toggleBtn();
  } else {
    audio.pause();
    isPlay = false;
    toggleBtn();
  };
  // stylePlayItems();
};
playBtn.addEventListener('click', playAudio);

function toggleBtn() {
  if (!isPlay) {
    playBtn.classList.remove('pause');
  } else {
    playBtn.classList.add('pause');
  };
};
playBtn.addEventListener('click', toggleBtn);


function playNext() {
  playNum = (playNum < (playList.length - 1)) ? (playNum += 1) : 0;
  isPlay = false;
  document.querySelectorAll('.item-active').forEach(el => {
    el.classList.remove('item-active');
  });
  playAudio();
  toggleBtn();
};
playNextBtn.addEventListener('click', playNext);

function playPrev() {
  playNum = (playNum > 0) ? (playNum -= 1) : (playList.length - 1);
  isPlay = false;
  document.querySelectorAll('.item-active').forEach(el => {
    el.classList.remove('item-active');
  });
  playAudio();
  toggleBtn();
};
playPrevBtn.addEventListener('click', playPrev);

// playList.forEach(el => {
//   const li = document.createElement('li');
//   li.classList.add('play-item');
//   li.textContent = el.title;
//   playListContainer.append(li);
// });

// function stylePlayItems() {
//   if (!isPlay ) {
//     document.querySelectorAll('.item-active').forEach(el => {
//       el.classList.remove('item-active');
//     });
//   } else {
//     document.querySelectorAll('.play-list li')[playNum].classList.add('item-active');
//   };
// };

// const arrElem = document.querySelectorAll('.play-item');
// const arrayElem = [];

// for (let i = 0; i < playList.length; i++){
//   arrayElem.push(arrElem[i]);
//   arrElem[i].addEventListener('click', function(e){
//     playNum = arrayElem.indexOf(e.target);
//     playAudio();
//   });
// };