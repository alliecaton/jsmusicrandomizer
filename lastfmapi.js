// 'use strict';
// class lastFmApi {
//     constructor(name, artist) {
//         this.name = name
//         this.artist = artist
//     }
    
//     getRelated() {
//         const _this = this
//         return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${this.artist.toLowerCase().trim()}&track=${this.name.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`) 
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(json) {
//             if (json.similartracks.track.length > 0 || json.similartracks === undefined) {
//                 let randomNum = Math.floor((Math.random() * 100))
//                 let songObject = json.similartracks.track[randomNum]
//                 console.log('get related', songObject)
//                 lastFmApi.displayResults(songObject)
//                 Youtube.getVideo(songObject.name, songObject.artist.name)
//             } else {
//                 lastFmApi.getRelatedArtists(_this.artist)
//             }
//         })
//         .catch(function(e) {
//             alert("Looks like we can't find data for that song :(")
//         })
//     }

//     static getRelatedArtists(artistName) {
//         return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(json) {
//             console.log(json)
//             let randomNum = Math.floor((Math.random() * 100))
//             let artist = json.similarartists.artist[randomNum].name
//             lastFmApi.getArtistTopSongs(artist)
//         })
//         .catch(function() {
//             alert("Something went wrong. Reload and try again!")
//         })
//     }

//     static getArtistTopSongs(artistName){
//         return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName.toLowerCase().trim()}&api_key=efeaa32576655308d8b417be9812fc15&format=json`)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(json) {
//             console.log(json)
//             let randomNum = Math.floor((Math.random() * 50))
//             let song = json.toptracks.track[randomNum]
//             lastFmApi.displayResults(song)
//             console.log(song)
//             Youtube.getVideo(song.name, song.artist.name)
//         })
//         .catch(function() {
//             alert("Something went wrong. Reload and try again!")
//         })
//     }

//     static displayResults(object) {
//         const div = document.getElementById('song-list')
//         while (div.firstChild) {
//             div.firstChild.remove()
//         }
//         const infoP = document.createElement('p')
//         infoP.innerText = `${object.name} - ${object.artist.name}`
//         infoP.setAttribute('id', 'song-name-artist')
//         div.appendChild(infoP)
//     }

//     static displayUserSongs(object){
//         if (currentUserObj) {
//             for (const element of object.songs) {
//                 const ul = document.getElementById('saved-songs')
//                 const link = document.createElement('a')
//                 const li = document.createElement('li')
//                 li.setAttribute("class", "new-song-li")
//                 li.innerText = `${element.title} - ${element.artist}`
//                 const img = document.createElement('img')
//                 img.setAttribute("src", "imgs/youtube.png")
//                 img.setAttribute("class", "youtube-image")
//                 link.append(img)
//                 link.setAttribute('href', element.url)
//                 li.appendChild(link)
//                 ul.appendChild(li)
//             }
//         }
//     }

// }

