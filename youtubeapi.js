class Youtube {

    static getVideo(title, artist) {

        let query = title.split(" ").join("+") + "+" + artist.split(" ").join("+")
        return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=1&q=${query}&key=AIzaSyAPiQa-MR679fruPabI0j7UmgkciB7wrg4`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json.items[0].id.videoId)
            Youtube.displayYoutubeLink(json.items[0].id.videoId)
        })
        .catch(function() {
            alert("Something went wrong. Reload and try again!")
        })
    }
    
    static displayYoutubeLink(videoId) {
        console.log("hit!")
        ytFrame.style.display = "inline"
        ytFrame.setAttribute("src", `https://www.youtube.com/embed/${videoId}`)
    }
}