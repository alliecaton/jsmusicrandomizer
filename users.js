class User {
    
    constructor(name) {
        this.name = name
    }

    static currentUser() {
        currentUserObj = totalUsers.find(u => u.name === currentUser.name)
        return currentUserObj
    }
    
    static getUsers() {
        return fetch(baseURL + '/users') 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           console.log('this is the json', json)
           totalUsers = json
        //    Song.displayUserSongs()
        })

    }

    static async getUserById() {
        return fetch(baseURL + `/users/${currentUserObj.id}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           console.log('individual user data', json)
           return json
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
                console.log('create user data', data);
                currentUser = data
                User.currentUser()
            })
        }

}
