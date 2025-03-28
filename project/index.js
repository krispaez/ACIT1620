// PLAYLIST

let music = document.querySelector("audio");
console.log(music)
music.volume = 0.1;

let reelItems = document.querySelectorAll(".reel-item");
let focusItem = document.getElementsByClassName("item-focus")

let title = document.querySelector(".song-title");
let artist = document.querySelector(".artist")
let album = document.querySelector(".album")
let cover = document.querySelector(".cover")

// const playBtn = document.querySelector(".play");
// let cssPlayBtn = window.getComputedStyle(playBtn);

// const pauseBtn = document.querySelector(".pause");
// let cssPauseBtn = window.getComputedStyle(pauseBtn);

// const prevBtn = document.querySelector(".prev");
// prevBtn.addEventListener("click", prevSong);

// const nextBtn = document.querySelector(".next");
// nextBtn.addEventListener("click", nextSong);

let playlist = [
        {
            path: "./music/realiti.m4a",
            name: "Realiti",
            artist: "Grimes",
            album: "Art Angels",
            cover: "./images/art-angels.jpg"
        },
        {
            path: "./music/oblivion.mp3",
            name: "Oblivion",
            artist: "Grimes",
            album: "Visions",
            cover: "./images/oblivion.jpg"
        },
        {
            path: "./music/for-sure.m4a",
            name: "For Sure",
            artist: "Carly Rae Jepsen",
            album: "Dedicated",
            cover: "./images/dedicated.jpg"
        },
        {
            path: "./music/let-go.m4a",
            name: "Let Go",
            artist: "Mitski",
            album: "Be the Cowboy",
            cover: "./images/nobody.jpg"
        },
        {
            path: "./music/mundo.m4a",
            name: "Mundo",
            artist: "White Hinterland",
            album: "Kairos",
            cover: "./images/kairos.jpg"
        }
    ];

// NEXT SONG

    let i = 0;
    music.src = playlist[i].path;
    title.innerHTML = playlist[i].name;
    artist.innerHTML = playlist[i].artist;
    album.innerHTML = playlist[i].album;
    cover.src = playlist[i].cover;

    const songData = document.getElementById("song-metadata");
    let cssSongData = window.getComputedStyle(songData);

    function nextSong() {
        if (i === playlist.length - 1) {
            i = 0;
        } else {
            i++;
        }
        music.src = playlist[i].path;
        music.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
        title.innerHTML = playlist[i].name;
        artist.innerHTML = playlist[i].artist;
        album.innerHTML = playlist[i].album;
        cover.src = playlist[i].cover;
        // reelItems[i].classList.add("item-focus")
        // focusItem.classList.remove("item-focus")
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
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
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
            playBtn.style.display = "inline";
            pauseBtn.style.display = "none";
        } else {
            music.play();
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline";
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
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
        nextSong();
    };

    pauseBtn.addEventListener("click", togglePlayPause);
    playBtn.addEventListener("click", togglePlayPause);