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
            if (covCen < (windCen + 100) && covCen > (windCen - 100)) {
                reelItems[i].classList.remove("item-left");
                reelItems[i].classList.remove("item-right");
                reelItems[i].classList.add("item-focus");
                // console.log('center');
            }
            else if (covCen > (windCen + 100)) {
                reelItems[i].classList.remove("item-left");
                reelItems[i].classList.remove("item-focus");
                reelItems[i].classList.add("item-right");
            } else {
                reelItems[i].classList.remove("item-right");
                reelItems[i].classList.remove("item-focus");
                reelItems[i].classList.add("item-left");
                // console.log(window.innerWidth, windCen, rect, covCen, )
            }
            // getCurrentCover() /*for testing - kat*/
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
    focusItem.classList.remove("item-focus");
    reelItems[i].classList.add("item-focus");
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

// PLAY-PAUSE TOGGLE

let isPlaying = false;

function togglePlayPause() {
    if (isPlaying == true) {
        music.pause();
    } else {
        music.play();
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
    nextSong();
};

// ALBUM STACKING

let rightItems = document.getElementsByClassName("item-right")
console.log(rightItems)
for (let i = 0; i < rightItems.length; i++) {
    let cssCov = window.getComputedStyle(rightItems[i]);
    rightItems[i].style.zIndex -= 1;
    console.log(rightItems[i].style.zIndex);
    };

// function getCurrentCover() {
//     console.log("v~~~~~covers~~~~~v");
//     let cssCov = window.getComputedStyle(covers[i]);
//     for (let i = 0; i < covers.length; i++) {
//         let imgType = covers[i].className
//         if (imgType == "cover-img item-focus") {
//             console.log(covers[i].style.zindex);
//             covers[i].style.zindex = 999;
//         } else {
//             console.log(covers[i].zindex);
//             covers[i].style.zindex = 0;
//         }
//     }
// }

// let songRows = document.querySelectorAll(".song-row");

// songRows.forEach((songRow, index) => {
//     songRow.addEventListener("click", () => {
//         // Scroll to the corresponding reel item
//         reelItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });

//         // Update song info based on the clicked row
//         title.innerHTML = playlist[index].name;
//         artist.innerHTML = playlist[index].artist;
//         album.innerHTML = playlist[index].album;
//         music.src = playlist[index].path;
//         music.play();

//         // Update the focus class
//         if (focusItem.length > 0) {
//             focusItem[0].classList.remove("item-focus");
//         }
//         reelItems[index].classList.add("item-focus");
//     });
// });
