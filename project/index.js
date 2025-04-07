// VARIABLES

let music = document.querySelector("audio");
music.volume = 0.05;

let reelItems = document.querySelectorAll(".reel-item");
let focusItem = document.getElementsByClassName("item-focus");

let title = document.querySelector(".song-title");
let artist = document.querySelector(".artist");
let album = document.querySelector(".album");

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
            let rect = reelItems[i].getBoundingClientRect();
            let windCen = window.innerWidth / 2;
            let covCen = (rect.width / 2) + rect.x;
            if (covCen < (windCen + 25) && covCen > (windCen - 25)) {
                reelItems[i].classList.remove("item-left");
                reelItems[i].classList.remove("item-right");
                reelItems[i].classList.add("item-focus");
            }
            else if (covCen > (windCen + 25)) {
                reelItems[i].classList.remove("item-left");
                reelItems[i].classList.remove("item-focus");
                reelItems[i].classList.add("item-right");
            } else {
                reelItems[i].classList.remove("item-right");
                reelItems[i].classList.remove("item-focus");
                reelItems[i].classList.add("item-left");
            }
        }
    }
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
    title.innerHTML = playlist[i].name;
    artist.innerHTML = playlist[i].artist;
    album.innerHTML = playlist[i].album;
    covers.src = playlist[i].cover;
}

music.onended = function () {
    nextSong();
};

// ALBUM STACKING

let rightItems = document.getElementsByClassName("item-right")
for (let i = 0; i < rightItems.length; i++) {
    let cssCov = window.getComputedStyle(rightItems[i]);
    rightItems[i].style.zIndex -= 1;
    };
