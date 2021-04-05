

function songFetcher() {
    return fetch('https://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=efeaa32576655308d8b417be9812fc15&format=json') 
    .then(function(response) {
    return response.json();
    })
    .then(function(json) {
        displayResults(json.results.trackmatches.track[0])
    }); 
}

function displayResults(object) {
    const songList = document.getElementById('song-list')
    const p = document.createElement('p')
    p.innerHTML = object.name
    songList.appendChild(p)
}