const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const audio = document.getElementById('audio');
const musicCover = document.getElementById('music-cover');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
//SONGS
const SONGS = [ 'Countryside', 'Heaven', 'MyTribe', 'Picasso', 'TheBlock' ];
let songIndex = 2;

loadSong(SONGS[songIndex]);

function loadSong(song) {
	title.innerText = song;
	audio.src = `songs/${song}.mp3`;
	musicCover.src = `images/${song}.jpg`;
}

function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');

	audio.pause();
}

function previousSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = SONGS.length - 1;
	}
	loadSong(SONGS[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > SONGS.length - 1) {
		songIndex = 0;
	}
	loadSong(SONGS[songIndex]);
	playSong();
}
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = currentTime / duration * 100;

	progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = clickX / width * duration;
}
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

previousBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
