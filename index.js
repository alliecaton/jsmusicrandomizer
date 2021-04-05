
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
        let randomNum = Math.floor((Math.random() * 100) + 1)
        let songObject = json.similartracks.track[`${randomNum}`]
        displayResults(songObject)
    })
}

const searchForm = document.getElementById("song-search")
searchForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    const songInput = document.getElementById('song-input-field')
    const artistInput = document.getElementById('artist-input-field')
    getRelated(songInput.value, artistInput.value)
})


function displayResults(object) {
    const result = document.getElementById('song-list')
    li = document.createElement('li')
    li.innerText = `${object.name} - ${object.artist.name}`
    const link = document.createElement('a')
    link.innerText = "Play Song"
    link.setAttribute('href', object.url)
    li.appendChild(link)
    result.appendChild(li)
}
