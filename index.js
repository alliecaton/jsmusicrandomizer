document.addEventListener('DOMContentLoaded', () =>{
    const searchForm = document.getElementById("song-search");
    searchForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const ul = document.getElementById('song-list')
        
        const songInput = document.getElementById('song-input-field').value
        const artistInput = document.getElementById('artist-input-field').value
        apiCall = new lastFmApi(songInput, artistInput)
        apiCall.getRelated()
    })
    
    User.createUser();
})

const baseURL = "http://localhost:3000"
let allUsers = []
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
    }
}

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
           console.log(json[json.length -1])
        })
    }

    static createUser() {
        return fetch('https://api.ipify.org/?format=json')
        .then(results => {
            return results.json()
        .then(json => {
            let newUser = new User(json.ip)
            allUsers.push(newUser)
            const currentUser = (allUsers.find(user => user.name === newUser.name)) 
            if (currentUser) {
                console.log(currentUser)
            } else {
            console.log(newUser)
            fetch(baseURL + "/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: newUser.name
                })
            })
        }
        })
    })
    }


}