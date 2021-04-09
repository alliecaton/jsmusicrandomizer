'use strict';
class User {
    
    constructor(name) {
        this.name = name
    }

    // static currentUser() {
    //     currentUserObj = totalUsers.find(u => u.name === currentUser.name);
    //     this.getUserById(currentUserObj.id)
    // }
    
    static getUsers() {
        return fetch(baseURL + '/users') 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           totalUsers = json
        //    currentUserObj = totalUsers.find(u => u.name === currentUser.name);
        //    User.getUserById(currentUser.name)
           return totalUsers
        })
        // .catch(function() {
        //     alert("Something went wrong. Reload and try again!")
        // })

    }

    static getUserByName(name) {
        return fetch(baseURL + "/users/" + `${name}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           console.log('individual user data', json)
           currentUserObj = json
           lastFmApi.displayUserSongs(json)
           return json
        })
        .catch(function() {
            alert("Something went wrong. Reload and try again!")
        })
    }

    static createUser(name) {
            let newUser = new User(name)
            fetch(baseURL + "/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name
                })
            })
            .then(function(response) {
                return response.json();
            })
              .then(function(data) {
                currentUser = data
                User.getUserByName(currentUser.name)

                // User.getUsers()
            })
            .catch(function() {
                alert("Something went wrong. Reload and try again!")
            })
        }

}


