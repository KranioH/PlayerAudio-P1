//      COVER REFERENCE
const cover = document.querySelector(".area-cover");
const playListArea = document.querySelector(".area-play-list");
const background = document.querySelector(".area-play");
const coverAlbum = document.querySelector("#cover-text-album");
const coverTextTitle = document.querySelector("#cover-text-title");
const coverTitle = document.querySelector("#cover-title");
const coverData = document.querySelector("#cover-data");


let volumeMus = false;
let indexMus = 0;
let playing = false;
const music = new Audio();


//      PLAY LIST REFERENCE
const playList = document.querySelector(".play-list");
const playListItem = document.querySelectorAll(".play-list-item");
const playListTitle = document.querySelectorAll(".play-list-title");
const playTopAlbum = document.querySelector("#play-top-album");
const playTopTitle = document.querySelector("#play-top-title");


//      BAR PROGRESS
const progress = document.querySelector("#play-function-progress");
const bar = document.querySelector("#play-function-bar");
const playFunctionTitle = document.querySelector(".playing-function-title");
const bntPlay = document.querySelector("#bntPlay");
const bntPrev = document.querySelector("#bntPrev");
const bntNext = document.querySelector("#bntNext");

//
const areaVolume = document.querySelector(".area-volume");
const bntVolume = document.querySelector("#bnt-volume");
const coverVolume = document.querySelector("#cover-volume");
const barVolume = document.querySelector("#bar-volume")

//
const bntList = document.querySelector("#bntList");


//
const musicTimeClass = document.querySelectorAll(".duraction-total")
const musicTime = document.querySelector("#duraction-total")
const musicTimeCurrent = document.querySelector("#duraction-current")


//      FUNCTIONS   
function loadSong(song) {
    cover.style.backgroundImage = `url("${song.cover}")`;
    // background.style.backgroundImage = `linear-gradient(to left, #131a35f0, #131a35f0), url("${song.background}")`;
    coverTitle.textContent = song.artist
    coverAlbum.textContent = song.album;
    coverTextTitle.textContent = song.musicName;
    coverData.textContent = song.data;
    playTopAlbum.textContent = song.album
    playTopTitle.textContent = song.musicName
    playFunctionTitle.textContent = song.musicName
    music.src = song.file;
}

function loadPlayList() {
    playListTitle.forEach((item, local) => item.textContent = songs[local].musicName)
}

function init() {
    if (playing) {
        playing = false;
        pauseMus();
    } else {
        playing = true;
        playMus();
    }
}

function playMus() {
    music.play();
    bntPlay.innerHTML = '<i class="bx bx-pause"></i>'
}

function pauseMus() {
    music.pause();
    bntPlay.innerHTML = '<i class="bx bx-play"></i>'
}

function changeMusic(value) {
    // console.log("antes da troca: "+indexMus)
    
    playListItem[indexMus].classList.remove("current-item")
    indexMus = (indexMus + value + songs.length) % songs.length;
    loadSong(songs[indexMus]);
    playing = true;
    playMus();
    playListItem[indexMus].classList.add("current-item")
    
    // console.log("Depois da troca: "+indexMus)
}

function progressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    bar.style.width = `${progressPercent}%`;
    bar.style.backgroundColor = `${songs[indexMus].color}`;

    //  FUNÇÃO PARA ARREDONDAR VALOR / CALCULO
    let timeFormat = (time) => String(Math.floor(time)).padStart(2,0)

    //  CHAMANDO A FUNÇÃO E FAZENDO O CALCULAR. DIVIDINDO O A DUAÇÃO EM SEG POR 60
    musicTime.textContent = `${timeFormat(duration / 60)}:${timeFormat(duration % 60)} `;
    musicTimeCurrent.textContent = `${timeFormat(currentTime / 60)}:${timeFormat(currentTime % 60)}`;
}

function clickProgressBar(e) {
    const width = progress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function openList() {
    if (playListArea.classList.contains("openlist")) {
        playListArea.classList.remove("openlist")
    } else {
        playListArea.classList.add("openlist");
    }
}

function clickVolume() {
    music.muted = !music.muted;

    if (volumeMus) {
        volumeMus = false;
        coverVolume.classList.replace("bxs-volume-mute", "bx-volume-full")
        bntVolume.innerHTML = '<i class="bx bx-volume-full"></i>'
    } else {
        volumeMus = true;
        coverVolume.classList.replace("bx-volume-full", "bxs-volume-mute")
        bntVolume.innerHTML = '<i class="bx bxs-volume-mute"></i>';
    }
}


playListItem.forEach((item, loc)=> {
    //item.setAttribute("id", `${songs[loc].id}`);

    item.addEventListener("click", ()=> {
        indexMus = loc;
        playing = false;
        loadSong(songs[loc]);
        init();
        // console.log("Clicando: "+indexMus)
        playListItem.forEach(item=> item.classList.remove("current-item"));
        item.classList.add("current-item");
        
    })
})


loadSong(songs[indexMus])
loadPlayList();



//      EVENT LISTENER

bntPlay.addEventListener("click", init);
music.addEventListener("timeupdate", progressBar);
music.addEventListener("ended", ()=> changeMusic(1));
bntPrev.addEventListener("click", ()=> changeMusic(-1));
bntNext.addEventListener("click", ()=> changeMusic(1));
progress.addEventListener("click", clickProgressBar);
bntVolume.addEventListener("click", clickVolume);
bntList.addEventListener("click", openList);

playListArea.addEventListener("click", (e)=>{
    let item = e.target.classList.contains("openlist");
    setTimeout(5000)
    if (item) playListArea.classList.remove("openlist")
})