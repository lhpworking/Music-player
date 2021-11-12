const musicContainer = document.querySelector(".music-container");
const btnPrev = document.querySelector(".btn-prev");
const btnPlay = document.querySelector(".btn-play");
const btnNext = document.querySelector(".btn-next");
const btnVol = document.querySelector(".btn-vol");
const progressContainer = document.querySelector(".music-progress");
const progress = document.querySelector(".progress");
const audio = document.querySelector("#audio");
const cover = document.querySelector("#cover");
const title = document.querySelector(".title");
const timeStart = document.querySelector("#time-start");
const timeEnd = document.querySelector("#time-end");
const volume = document.querySelector("#volume");

// list song
const songSrc = ["thaydoi", "peaches", "anthan"];
const songName = ["Thay Doi", "Peaches", "An Than"];
const songAuthor = ["Lil Wuyn", "Justin Bieber", "Low G"];

// current song
let currentIndex = 0;
// load current song
loadSong(
  songSrc[currentIndex],
  songName[currentIndex],
  songAuthor[currentIndex]
);
changeVolume();

// song events
function loadSong(songSrc, songName, songAuthor) {
  title.innerHTML = `${songName} - ${songAuthor}`;
  cover.src = `assets/img/${songSrc}.jpeg`;
  audio.src = `assets/music/${songSrc}.mp3`;
}
function playSong() {
  musicContainer.classList.add("play");
  btnPlay.querySelector("i.bx").classList.remove("bx-play");
  btnPlay.querySelector("i.bx").classList.add("bx-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  btnPlay.querySelector("i.bx").classList.remove("bx-pause");
  btnPlay.querySelector("i.bx").classList.add("bx-play");

  audio.pause();
}

function prevSong() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = songSrc.length - 1; // get last index
  }
  loadSong(
    songSrc[currentIndex],
    songName[currentIndex],
    songAuthor[currentIndex]
  );
  console.log(currentIndex);
  playSong();
}

function nextSong() {
  currentIndex++;
  if (currentIndex > songSrc.length - 1) {
    currentIndex = 0;
  }
  loadSong(
    songSrc[currentIndex],
    songName[currentIndex],
    songAuthor[currentIndex]
  );
  console.log(currentIndex);
  playSong();
}
function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  var minutesStart = addZero(Math.floor(currentTime / 60) % 60);
  var secondStart = addZero(Math.floor(currentTime % 60));

  var minutesEnd = addZero(Math.floor(duration / 60));
  var secondsEnd = addZero(Math.floor(duration - minutesEnd * 60));

  var timeStartAudio = `${minutesStart}:${secondStart}`;
  var timeEndAudio = `${minutesEnd}:${secondsEnd}`;
  timeEnd.innerHTML = timeEndAudio;
  timeStart.innerHTML = timeStartAudio;
}

function setProgress(e) {
  const widthProgress = progressContainer.clientWidth; // get width of element
  const clickX = e.offsetX; // get width of element on truc X
  const duration = audio.duration;
  audio.currentTime = (clickX / widthProgress) * duration;
}
function changeVolume() {
  volume.addEventListener("change", function () {
    if (volume.value == 0) {
      isMuted();
    } else {
      unMute();
      audio.volume = volume.value / 100;
    }
  });
}
function isMuted() {
  btnVol.querySelector("i.bx").classList.remove("bxs-volume-full");
  btnVol.querySelector("i.bx").classList.add("bxs-volume-mute");
  audio.volume = 0;
  volume.value = 0;
}
function unMute() {
  if (volume.value == 0) {
    isMuted();
  } else {
    btnVol.querySelector("i.bx").classList.add("bxs-volume-full");
    btnVol.querySelector("i.bx").classList.remove("bxs-volume-mute");
  }
}
// events listener
btnPlay.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

btnVol.addEventListener("click", function () {
  const isMuting = btnVol
    .querySelector("i.bx")
    .classList.contains("bxs-volume-mute");
  if (isMuting) {
    unMute();
  } else {
    isMuted();
  }
});

btnPrev.addEventListener("click", prevSong);
btnNext.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("volumechange", changeVolume);
progressContainer.addEventListener("click", setProgress);


// add 0 in time of song when second < 10
function addZero(second) {
  return second < 10 ? "0" + second : second;
}
