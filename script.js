const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const durationDisplay = document.getElementById('duration');

const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: "song3.mp3"
  }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function shuffleSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === songIndex);
  songIndex = randomIndex;
  loadSong(songs[songIndex]);
  playSong();
}

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  const currentMinutes = Math.floor(audio.currentTime / 60) || 0;
  const currentSeconds = Math.floor(audio.currentTime % 60) || 0;
  const durationMinutes = Math.floor(audio.duration / 60) || 0;
  const durationSeconds = Math.floor(audio.duration % 60) || 0;

  durationDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
});

function seek(event) {
  const value = event.target.value;
  audio.currentTime = (value / 100) * audio.duration;
}

function changeVolume(value) {
  audio.volume = value;
}

function changeBackground(color) {
  document.body.style.backgroundColor = color;
}

function changeBoxColor(color) {
  document.querySelector('.music-player').style.backgroundColor = color;
}

function changeFont(font) {
  document.querySelector('.music-player').style.fontFamily = font;
}

loadSong(songs[songIndex]);

