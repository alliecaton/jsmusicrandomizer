'use strict';

document.addEventListener('DOMContentLoaded', () => {
    addSongButton.style.display = "none"
    ytFrame.style.display = "none"
    // const searchForm = document.getElementById("song-search");
    const usernameForm = document.getElementById("username")
    const searchFormButton = document.getElementById('search-button')
    searchFormButton.addEventListener("click", (e)=> {
        e.preventDefault()
        const ul = document.getElementById('song-list')
        
        const songInput = document.getElementById('song-input-field').value
        const artistInput = document.getElementById('artist-input-field').value
        
        if (!songInput || !artistInput) {
            alert("Enter a song name and artist")
        } else {
            if (currentUserObj) {
                addSongButton.style.display = "inline"
            }
            let apiCall = new lastFmApi(songInput, artistInput)
            addSongButton.addEventListener('click', savedSongsHandler)
            apiCall.getRelated()
        }
    })
    
    usernameForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const inputName = document.getElementById("name-field").value.trim()
        if (!inputName) {
            alert("Please enter a name")
        } else {
            const songDiv = document.getElementById("song-div")

            songDiv.style.display = "inline"
            let newUser = User.createUser(inputName)
            usernameForm.style.display = "none"

            if (ytFrame.style.display === "inline") {
                addSongButton.style.display = "inline"
            }

        }
    })

    const savedSongsHandler = function(e) {
        e.preventDefault()
        const theLi = document.getElementById('song-name-artist').innerText.split(' - ')
        const songTitle = theLi[0]
        const artistName = theLi[1]
        const songUrl = ytFrame.getAttribute("src")

        Song.createSong(songTitle, artistName, songUrl)
        const addedUl = document.getElementById('saved-songs')
        const addedLi = document.createElement('li')
        addedLi.setAttribute("class", "new-song-li")
        addedLi.innerText = `${songTitle} - ${artistName}`
        const aTag = document.createElement('a')
        const img = document.createElement('img')
        img.setAttribute("src", "imgs/youtube.png")
        img.setAttribute("class", "youtube-image")
        aTag.append(img)
        aTag.setAttribute('href', songUrl)
        addedLi.append(aTag)
        addedUl.append(addedLi)
    }
    
})

const addSongButton = document.getElementById("song-add")
const baseURL = "https://aqueous-beyond-33951.herokuapp.com"
const ytFrame = document.getElementById('ytplayer')
let currentUser;
let currentUserObj;

// LAST FM API //
class lastFmApi {
    constructor(name, artist) {
        this.name = name
        this.artist = artist
    }
    
    getRelated() {
        const _this = this
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${this.artist.toLowerCase().trim()}&track=${this.name.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            if (json.similartracks.track.length > 0 || json.similartracks === undefined) {
                let randomNum = Math.floor((Math.random() * 100))
                let songObject = json.similartracks.track[randomNum]
                console.log('get related', songObject)
                lastFmApi.displayResults(songObject)
                Youtube.getVideo(songObject.name, songObject.artist.name)
            } else {
                lastFmApi.getRelatedArtists(_this.artist)
            }
        })
        .catch(function(e) {
            alert("Looks like we can't find data for that song :(")
        })
    }

    static getRelatedArtists(artistName) {
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json)
            let randomNum = Math.floor((Math.random() * 100))
            let artist = json.similarartists.artist[randomNum].name
            lastFmApi.getArtistTopSongs(artist)
        })
        .catch(function() {
            alert("Something went wrong. Reload and try again!")
        })
    }

    static getArtistTopSongs(artistName){
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json)
            let randomNum = Math.floor((Math.random() * 50))
            let song = json.toptracks.track[randomNum]
            lastFmApi.displayResults(song)
            console.log(song)
            Youtube.getVideo(song.name, song.artist.name)
        })
        .catch(function() {
            alert("Something went wrong. Reload and try again!")
        })
    }

    static displayResults(object) {
        const div = document.getElementById('song-list')
        while (div.firstChild) {
            div.firstChild.remove()
        }
        const infoP = document.createElement('p')
        infoP.innerText = `${object.name} - ${object.artist.name}`
        infoP.setAttribute('id', 'song-name-artist')
        div.appendChild(infoP)
    }

    static displayUserSongs(object){
        if (currentUserObj) {
            for (const element of object.songs) {
                const ul = document.getElementById('saved-songs')
                const link = document.createElement('a')
                const li = document.createElement('li')
                li.setAttribute("class", "new-song-li")
                li.innerText = `${element.title} - ${element.artist}`
                const img = document.createElement('img')
                img.setAttribute("src", "imgs/youtube.png")
                img.setAttribute("class", "youtube-image")
                link.append(img)
                link.setAttribute('href', element.url)
                li.appendChild(link)
                ul.appendChild(li)
            }
        }
    }

}

// YOUTUBE API //

class Youtube {

    static getVideo(title, artist) {

        let query = title.split(" ").join("+") + "+" + artist.split(" ").join("+")
        return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=1&q=${query}&key=AIzaSyAJty4rEviFcHHq_UOzHiGLuB3vFteDLJM`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json.items[0].id.videoId)
            Youtube.displayYoutubeLink(json.items[0].id.videoId)
        })
        .catch(function() {
            alert("Something went wrong. Reload and try again!")
        })
    }
    
    static displayYoutubeLink(videoId) {
        console.log("hit!")
        ytFrame.style.display = "inline"
        ytFrame.setAttribute("src", `https://www.youtube.com/embed/${videoId}`)
    }
}

// SONG CLASS //
class Song {
    constructor(title, artist, url) {
        this.title = title 
        this.artist = artist
        this.url = url
    }

    static createSong(songTitle, artistName, songUrl){
        let newSong = new Song(songTitle, artistName, songUrl)
        fetch(baseURL + "/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                title: newSong.title,
                artist: newSong.artist,
                user_id: currentUserObj.id,
                url: newSong.url
            })
        })
        .then(function(response) {
            return response.json();
        })
          .then(function(data) {
            console.log(data);
        })
          .catch(function(error) {
            alert("Something went wrong!");
            console.log(error.message);
        })
    }
}

// USER CLASS //

class User {
    
    constructor(name) {
        this.name = name
    }

    static getUsers() {
        return fetch(baseURL + '/users') 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            return json
        })

    }

    static getUserByName(name) {
        return fetch(baseURL + "/users/" + name) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           console.log('individual user data', json)
           currentUserObj = json
           lastFmApi.displayUserSongs(json)
           return json
        })
        .catch(function() {
            alert("Something went wrong. Reload and try again!")
        })
    }

    static createUser(name) {
            let newUser = new User(name)
            fetch(baseURL + "/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name
                })
            })
            .then(function(response) {
                return response.json();
            })
              .then(function(data) {
                currentUser = data
                User.getUserByName(currentUser.name)
            })
            .catch(function() {
                alert("Something went wrong. Reload and try again!")
            })
        }

}


