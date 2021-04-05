
// function songFetcher(name) {
//     return fetch('https://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=efeaa32576655308d8b417be9812fc15&format=json') 
//     .then(function(response) {
//     return response.json();
//     })
//     .then(function(json) {
//         console.log(json.results.trackmatches.track[0].name, json.results.trackmatches.track[0].artist)
//     }); 
// }


function getRelated(name, artist) {
    return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist.toLowerCase().trim()}&track=${name.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`) 
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json)
        let randomNum = Math.floor((Math.random() * 100))
        let songObject = json.similartracks.track[`${randomNum}`]
        displayResults(songObject)
    })
}

const searchForm = document.getElementById("song-search")
searchForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    const ul = document.getElementById('song-list')

    const songInput = document.getElementById('song-input-field')
    const artistInput = document.getElementById('artist-input-field')
    getRelated(songInput.value, artistInput.value)
})


function displayResults(object) {
    const ul = document.getElementById('song-list')
    const link = document.createElement('a')
    while (ul.firstChild) {
        ul.firstChild.remove()
    }
    li = document.createElement('li')
    li.innerText = `${object.name} - ${object.artist.name}`
    link.innerText = "Play Song"
    link.setAttribute('href', object.url)
    li.appendChild(link)
    ul.appendChild(li)
}


class Song {




}