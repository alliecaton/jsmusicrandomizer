
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
    return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artist.toLowerCase()}&track=${name.toLowerCase()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`) 
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json)
        displayResults(json.similartracks)
    }); 
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
    const li = document.createElement('li')
    li.innerText = `${object.track[0].name} - ${object.track[0].name}`
    const button = document.createElement('button')
    button.innerText = "Play Song"
    
    result.appendChild(li)
}
