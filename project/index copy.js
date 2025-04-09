// VARIABLES

let music = document.querySelector("audio");
music.volume = 0.5;

let title = document.querySelector(".song-title");
let rowTitle = document.querySelector(".row-title");
let artist = document.querySelector(".artist");
let rowArtist = document.querySelector(".row-artist");
let album = document.querySelector(".album");
let rowAlbum = document.querySelector(".row-album");

const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", prevSong);

const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", nextSong);

// PLAYLIST

let playlist = [
    {
        path: "./music/penguintown.mp3",
        name: "Penguin Town",
        artist: "snoozybeats",
        album: "Royalty Free Lofi",
        art: "./images/art-angels.jpg",
        text: "Art Angels album art"
    },
    {
        path: "./music/lastcappuccino.mp3",
        name: "Last Cappuccino in Rio",
        artist: "Chris Haugen",
        album: "YouTube Audio Library",
        art: "./images/dedicated.jpg",
        text: "Dedicated album art"
    },
    {
        path: "./music/kittydownthestairs.mp3",
        name: "Kitty Down the Stairs",
        artist: "Joel Cummins",
        album: "YouTube Audio Library",
        art: "./images/oblivion.jpg",
        text: "Visions album art"
    },
    {
        path: "./music/piensoviento.mp3",
        name: "Pienso Viento",
        artist: "Casa Rosa",
        album: "YouTube Audio Library",
        art: "./images/nobody.jpg",
        text: "Mitski album art"
    },
    {
        path: "./music/mundo.m4a",
        name: "Mundo",
        artist: "White Hinterland",
        album: "Kairos",
        art: "./images/kairos.jpg",
        text: "Kairos album art"
    },
];

let i = 0;
music.src = playlist[i].path;
title.innerHTML = playlist[i].name;
rowTitle.innerHTML = playlist[i].name;
artist.innerHTML = playlist[i].artist;
rowArtist.innerHTML = playlist[i].artist;
album.innerHTML = playlist[i].album;
rowAlbum.innerHTML = playlist[i].album;

let reelItems = document.querySelectorAll(".reel-item");
let focusItem = document.getElementsByClassName("item-focus");

// INSERT COVERS

let reelCont = document.getElementById("reel-container");
let cssCont = window.getComputedStyle(reelCont);
let covers = document.querySelectorAll(".cover-img");

function coverFlip() {
    for (let i = 0; i < playlist.length; i++) {
        for (let i = 0; i < covers.length; i++) {
            covers[i].src = playlist[i].art;
            covers[i].alt = playlist[i].text;
            let rect = reelItems[i].getBoundingClientRect();
            let windCen = window.innerWidth / 2;
            let covCen = (rect.width / 2) + rect.x;
            if (covCen < (windCen + 100) && covCen > (windCen - 100)) {
                reelItems[i].classList.remove("item-left");
                reelItems[i].classList.remove("item-right");
                reelItems[i].classList.add("item-focus");
            }
            else if (covCen > (windCen + 100)) {
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
    currentSong(i);
}

// PREVIOUS SONG

function prevSong() {
    if (i === 0) {
        i = playlist.length - 1;
    } else {
        i--;
    }
    currentSong(i);
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

    let songRows = document.querySelectorAll(".song-row");

songRows.forEach((songRow, index) => {
    songRow.addEventListener("click", () => {
        //go to selected song
        currentSong(index)
    });
});

function currentSong(index) {
    // Update the focus class
    for (let i = 0; i < reelItems.length; i++) {
        console.log(i, )
        if (i === index) {
            reelItems[i].classList.remove("item-left");
            reelItems[i].classList.remove("item-right");
            reelItems[i].classList.add("item-focus");
        } else if (i > index) {
            reelItems[i].classList.remove("item-left");
            reelItems[i].classList.remove("item-focus");
            reelItems[i].classList.add("item-right");
        } else {
            reelItems[i].classList.remove("item-right");
            reelItems[i].classList.remove("item-focus");
            reelItems[i].classList.add("item-left");
        }
    };
    // Update song info based on the clicked row
    title.innerHTML = playlist[index].name;
    artist.innerHTML = playlist[index].artist;
    album.innerHTML = playlist[index].album;
    music.src = playlist[index].path;
    music.play();
    // Scroll to the corresponding reel item and center album cover
    reelItems[index].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
    i = index;
}