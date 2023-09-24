const audio = document.querySelector("audio");
const background = document.querySelector(".background-img");
const thumbnail = document.querySelector(".thumbnail");
const progressBar = document.querySelector(".progress-bar");
const progressBarBefore = document.querySelector(".progress-bar-before");
const currentTimeBar = document.querySelector(".current-time");
const durationTimeBar = document.querySelector(".duration-time");
const title = document.querySelector(".song-title");
const artist = document.querySelector(".song-artist");
const playPrevBtn = document.querySelector(".play-prev");
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");

import playList from "./playList.js";

let isPlay = false;
let playNum = 0;

function playAudio() {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    toggleBtn();
  } else {
    audio.pause();
    isPlay = false;
    toggleBtn();
  }
}
playBtn.addEventListener("click", playAudio);

function toggleBtn() {
  if (!isPlay) {
    playBtn.classList.remove("pause");
    thumbnail.classList.add("thumbnail-play");
  } else {
    playBtn.classList.add("pause");
    thumbnail.classList.remove("thumbnail-play");
  }
}

function switchSong() {
  audio.src = playList[playNum].src;
  background.src = playList[playNum].thumbnail;
  thumbnail.src = playList[playNum].thumbnail;
  title.innerHTML = playList[playNum].title;
  artist.innerHTML = playList[playNum].artist;
}

function playNext() {
  playNum = playNum < playList.length - 1 ? (playNum += 1) : 0;
  switchSong();
  audio.addEventListener("loadedmetadata", changeTimeBar);
  isPlay = false;
  audio.currentTime = 0;
  playAudio();
  toggleBtn();
}
playNextBtn.addEventListener("click", playNext);

audio.addEventListener("ended", playNext);

function playPrev() {
  playNum = playNum > 0 ? (playNum -= 1) : playList.length - 1;
  switchSong();
  audio.addEventListener("loadedmetadata", changeTimeBar);
  isPlay = false;
  audio.currentTime = 0;
  playAudio();
  toggleBtn();
}
playPrevBtn.addEventListener("click", playPrev);

function moveTrackBar() {
  const newPosition = (progressBar.value / 9000) * audio.duration;
  audio.currentTime = newPosition;
}
progressBar.addEventListener("input", moveTrackBar);

audio.addEventListener("timeupdate", changeTimeBar);

function changeTimeBar() {
  progressBar.value = (audio.currentTime / audio.duration) * 9000;
  progressBarBefore.style.width = `${
    (audio.currentTime / audio.duration) * 100
  }%`;
  currentTimeBar.innerHTML = formatTime(audio.currentTime);
  durationTimeBar.innerHTML = formatTime(audio.duration);
}
durationTimeBar.innerHTML = formatTime(audio.duration) || "0:00";
audio.addEventListener("loadedmetadata", changeTimeBar);

function formatTime(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  const result =
    Number.isNaN(minutes) || Number.isNaN(seconds)
      ? "Loading..."
      : `${minutes}:${seconds}`;
  return result;
}
