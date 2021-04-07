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
            const songUrl = link.getAttribute('href')

            Song.createSong(songTitle, artistName, songUrl)
            const addedUl = document.getElementById('saved-songs')
            
            addedUl.append(li)
            addSongButton.removeEventListener('click', savedSongsHandler)
        }

        addSongButton.addEventListener('click', savedSongsHandler)

    }

    
    // static displayUserSongs(){
    //     if (currentUserObj) {
    //         console.log(User.getUserById(currentUserObj.id))
            
    //     }
    // }

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