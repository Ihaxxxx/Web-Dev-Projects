let currentSong = new Audio();
let songUL;
let songs;
let currFolder;
//seconds to minutes funtion
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    //show all the songs in playlist
    songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songOverview = song.replaceAll("%20", " ")
        songName = songOverview.split("-")[1]
        songArtist = songOverview.split("-")[0]
        songUL.innerHTML = songUL.innerHTML + `<li>                         
                            <img class="invert" src="Images/music.svg" alt="" srcset="">
                            <div class="info">
                                <div>${songOverview}</div>
                                <div>${songArtist}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="Images/play.svg" alt="">
                            </div>
                        </li> `
    }
    // Attach an event Listneer to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/"+track)
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "Images/pause.svg"
    }
    currentSong.play()
    document.querySelector(".songInfo").innerHTML = decodeURI(track)
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1);
            //Get the meta data
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
            let response = await a.json()
            cardcontainer.innerHTML = cardcontainer.innerHTML + `                    <div data-folder="${folder}" class="card">
                <div class="play"><img src="Images/play.svg" alt=""></div>
                <img src="/songs/${folder}/cover.jpeg" alt="">
                <h2>${response.title}</h2>
                <p>${response.description}</p>
                </div>`
        }
    }

    //load the playlist whenever the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)

        })
    })

}

async function main() {
    // get the list of all the songs
    await getSongs("songs/Maanu")
    playMusic(songs[0], true)

    //display all the albums
    displayAlbums()


    //Attach an event listener to play next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "Images/pause.svg"
        } else {
            currentSong.pause()
            play.src = "Images/play.svg"
        }
    })

    //Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    //add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width * 100)
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100
    })

    // Add an event lister to hamburger 
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //Close Button activate

    document.querySelector(".closeBtn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    //add event listener to previous and next
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if (index - 1 > -1) {
            playMusic(songs[index - 1])
        }
    })


    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    //Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", e => {
        currentSong.volume = parseInt(e.target.value) / 100
    })

    // Add evnet listener to mute the track
    document.querySelector(".volBtn").addEventListener("click", e=>{
        if (e.target.src.includes("volume.svg")) {
            console.log(e.target);
            e.target.src = e.target.src.replace("volume.svg","mute.svg");
            currentSong.volume = 0
            document.querySelector(".range").getElementsByTagName("input")[0] = 0
        }else{
            e.target.src = e.target.src.replace("mute.svg","volume.svg")
            currentSong.volume = 0.1
            document.querySelector(".range").getElementsByTagName("input")[0] = 10
        }

    })
}

main()


