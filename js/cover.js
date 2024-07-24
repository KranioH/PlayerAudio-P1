//      COVER REFERENCE
const cover = document.querySelector(".area-cover");
const coverAlbum = document.querySelector("#cover-text-album");
const coverTextTitle = document.querySelector("#cover-text-title");
const coverTitle = document.querySelector("#cover-title");
const coverData = document.querySelector("#cover-data");

let indexMus = 0;
let playing = false;
const music = new Audio();

//      PLAY LIST REFERENCE
const playList = document.querySelector(".play-list");
const playListItem = document.querySelectorAll(".play-list-item");
const playListTitle = document.querySelectorAll(".play-list-title");

//      BAR PROGRESS
const bar = document.querySelector(".play-function-bar");
const bntPlay = document.querySelector("#bntPlay");


//      FUNCTIONS   
function loadSong(song) {
    cover.style.backgroundImage = `url("${song.cover}")`;
    coverTitle.textContent = song.artist
    coverAlbum.textContent = song.album;
    coverTextTitle.textContent = song.musicName;
    coverData.textContent = song.data;
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
    bntPlay.classList.replace("bx-play", "bx-pause");
    bar.style.width = "10%"
}

function pauseMus() {
    music.pause();
    bntPlay.classList.replace("bx-pause", "bx-play");
}


playListItem.forEach((item, loc)=> {
    item.setAttribute("id", `${songs[loc].id}`);

    item.addEventListener("click", ()=> {
        playing = true;
        loadSong(songs[loc]);
        playMus();
        
        playListItem.forEach(item=> item.classList.remove("current-item"));
        item.classList.add("current-item")
        
    })
})


loadSong(songs[indexMus])
loadPlayList();