document.addEventListener('DOMContentLoaded', () => {
    searchForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const ul = document.getElementById('song-list')
        
        const songInput = document.getElementById('song-input-field').value
        const artistInput = document.getElementById('artist-input-field').value
        apiCall = new lastFmApi(songInput, artistInput)
        apiCall.getRelated()
    })
    
    usernameForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const inputName = document.getElementById("name-field").value
        const songDiv = document.getElementById("song-div")
        songDiv.style.visibility = "visible"
        let newUser = User.createUser(inputName)
        usernameForm.style.visibility = "hidden"
        User.getUsers()
        console.log('testing when this prints')
    })
    
})

let totalUsers = []
const searchForm = document.getElementById("song-search");
const usernameForm = document.getElementById("username")
const addSongButton = document.getElementById("song-add")
const baseURL = "http://localhost:3000"
let currentUser;
let currentUserObj;


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
                title: `${newSong.title}`,
                artist: `${newSong.artist}`,
                user_id: currentUserObj.id,
                url: `${newSong.url}`
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

class User {
    
    constructor(name) {
        this.name = name
    }

    static currentUser() {
        currentUserObj = totalUsers.find(u => u.name === currentUser.name)
        this.getUserById(currentUserObj.id)
    }
    
    static getUsers() {
        return fetch(baseURL + '/users') 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           totalUsers = json
        })

    }

    static async getUserById(id) {
        return fetch(baseURL + "/users/" + `${id}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           console.log('individual user data', json)
           lastFmApi.displayUserSongs(json)
           return json
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
                console.log('create user data', data);
                currentUser = data
                User.currentUser()
            })
        }

}


// last.fm api class
class lastFmApi {
    constructor(name, artist) {
        this.name = name
        this.artist = artist
    }
    
    getRelated() {
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${this.artist.toLowerCase().trim()}&track=${this.name.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json)
            let randomNum = Math.floor((Math.random() * 100))
            let songObject = json.similartracks.track[`${randomNum}`]
            lastFmApi.displayResults(songObject)
        })
    }

    static displayResults(object) {
        const ul = document.getElementById('song-list')
        const link = document.createElement('a')
        while (ul.firstChild) {
            ul.firstChild.remove()
        }
        const li = document.createElement('li')
        li.innerText = `${object.name} - ${object.artist.name}`
        link.innerText = "Play Song"
        link.setAttribute('href', object.url)
        li.appendChild(link)
        ul.appendChild(li)

        const savedSongsHandler = function(e) {
            e.preventDefault()
            const songTitle = object.name
            const artistName = object.artist.name
            debugger;
            const songUrl = link.getAttribute('href')

            Song.createSong(songTitle, artistName, songUrl)
            const addedUl = document.getElementById('saved-songs')
            
            addedUl.append(li)
            addSongButton.removeEventListener('click', savedSongsHandler)
        }

        addSongButton.addEventListener('click', savedSongsHandler)

    }

    static displayUserSongs(object){
        if (currentUserObj) {
            debugger;
        }
    }

    static fetchSingleSong(song, artist) {
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=efeaa32576655308d8b417be9812fc15&artist=${artist.toLowerCase().trim()}&track=${song.toLowerCase().trim()}&format=json`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json)
        })
    }

}