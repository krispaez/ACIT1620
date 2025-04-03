// VARIABLES

let music = document.querySelector("audio");
music.volume = 0.1;

let reelItems = document.querySelectorAll(".reel-item");
let focusItem = document.getElementsByClassName("item-focus");

let title = document.querySelector(".song-title");
let artist = document.querySelector(".artist");
let album = document.querySelector(".album");

// const playBtn = document.querySelector(".play");
// let cssPlayBtn = window.getComputedStyle(playBtn);

// const pauseBtn = document.querySelector(".pause");
// let cssPauseBtn = window.getComputedStyle(pauseBtn);

const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", prevSong);

const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", nextSong);

// PLAYLIST

let playlist = [
    {
        path: "./music/realiti.m4a",
        name: "Realiti",
        artist: "Grimes",
        album: "Art Angels",
        art: "./images/art-angels.jpg"
    },
    {
        path: "./music/oblivion.mp3",
        name: "Oblivion",
        artist: "Grimes",
        album: "Visions",
        art: "./images/oblivion.jpg"
    },
    {
        path: "./music/for-sure.m4a",
        name: "For Sure",
        artist: "Carly Rae Jepsen",
        album: "Dedicated",
        art: "./images/dedicated.jpg"
    },
    {
        path: "./music/let-go.m4a",
        name: "Let Go",
        artist: "Mitski",
        album: "Be the Cowboy",
        art: "./images/nobody.jpg"
    },
    {
        path: "./music/mundo.m4a",
        name: "Mundo",
        artist: "White Hinterland",
        album: "Kairos",
        art: "./images/kairos.jpg"
    },
];

let i = 0;
music.src = playlist[i].path;
title.innerHTML = playlist[i].name;
artist.innerHTML = playlist[i].artist;
album.innerHTML = playlist[i].album;

// INSERT COVERS

let reelCont = document.getElementById("reel-container");
let covers = document.querySelectorAll(".cover-img");

function coverFlip() {
    for (let i = 0; i < playlist.length; i++) {
        for (let i = 0; i < covers.length; i++) {
            covers[i].src = playlist[i].art;
            let rect = covers[i].getBoundingClientRect();
            let windCen = window.innerWidth / 2;
            let covCen = (rect.width / 2) + rect.x;
            if (covCen < (windCen + 100) && covCen > (windCen - 100)) {
                covers[i].classList.remove("item-left");
                covers[i].classList.remove("item-right");
                covers[i].classList.add("item-focus");
                console.log('center');
            }
            else if (covCen > (windCen + 100)) {
                covers[i].classList.remove("item-left");
                covers[i].classList.add("item-right");
            } else {
                covers[i].classList.remove("item-right");
                covers[i].classList.add("item-left");
                console.log(window.innerWidth, windCen, rect, covCen, )
            }
        }}
    }

reelCont.addEventListener("scroll", coverFlip);

const songData = document.getElementById("song-metadata");
let cssSongData = window.getComputedStyle(songData);

// NEXT SONG

function nextSong() {
    if (i === playlist.length - 1) {
        i = 0;
    } else {
        i++;
    }
    music.src = playlist[i].path;
    music.play();
    // playBtn.style.display = "none";
    // pauseBtn.style.display = "inline";
    title.innerHTML = playlist[i].name;
    artist.innerHTML = playlist[i].artist;
    album.innerHTML = playlist[i].album;
    reelItems[i].classList.add("item-focus");
    focusItem.classList.remove("item-focus");
    console.log("hi");
}

// PREVIOUS SONG

function prevSong() {
    if (i === 0) {
        i = playlist.length - 1;
    } else {
        i--;
    }
    music.src = playlist[i].path;

    music.play();
    // playBtn.style.display = "none";
    // pauseBtn.style.display = "inline";
    title.innerHTML = playlist[i].name;
    artist.innerHTML = playlist[i].artist;
    album.innerHTML = playlist[i].album;
    cover.src = playlist[i].cover;
    // reelItems[i].classList.remove("item-focus")
    // focusItem.classList.add("item-focus")
}

// PLAY-PAUSE TOGGLE

let isPlaying = false;

function togglePlayPause() {
    if (isPlaying == true) {
        music.pause();
        // playBtn.style.display = "inline";
        // pauseBtn.style.display = "none";
    } else {
        music.play();
        // playBtn.style.display = "none";
        // pauseBtn.style.display = "inline";
    }
}

music.onplaying = function () {
    isPlaying = true;
};
music.onpause = function () {
    isPlaying = false;
};

music.onended = function () {
    isPlaying = false;
    // playBtn.style.display = "inline";
    // pauseBtn.style.display = "none";
    nextSong();
};

// pauseBtn.addEventListener("click", togglePlayPause);
// playBtn.addEventListener("click", togglePlayPause);

// ALBUM STACKING

// insert paths to covers for each object in playlist array onto reel items
// loop through, starting with i=0
// add class .item-focus to playlist[i]
// if reelitem index < i, add class .item-left
// if reelitem index > i, add class .item-right
// for each item-right, decrease z-index by one
