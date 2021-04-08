'use strict';

document.addEventListener('DOMContentLoaded', () => {
    addSongButton.style.display = "none"
    ytFrame.style.display = "none"
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

let totalUsers = []
const searchForm = document.getElementById("song-search");
const usernameForm = document.getElementById("username")
const addSongButton = document.getElementById("song-add")
const baseURL = "https://aqueous-beyond-33951.herokuapp.com"
const ytFrame = document.getElementById('ytplayer')
let currentUser;
let currentUserObj;
const searchFormButton = document.getElementById('search-button')
