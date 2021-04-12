// 'use strict';
// class Song {
//     constructor(title, artist, url) {
//         this.title = title 
//         this.artist = artist
//         this.url = url
//     }

//     static createSong(songTitle, artistName, songUrl){
//         let newSong = new Song(songTitle, artistName, songUrl)
//         fetch(baseURL + "/songs", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 title: newSong.title,
//                 artist: newSong.artist,
//                 user_id: currentUserObj.id,
//                 url: newSong.url
//             })
//         })
//         .then(function(response) {
//             return response.json();
//         })
//           .then(function(data) {
//             console.log(data);
//         })
//           .catch(function(error) {
//             alert("Something went wrong!");
//             console.log(error.message);
//         })
//     }
// }