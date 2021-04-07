class User {
    
    constructor(name) {
        this.name = name
    }

    static currentUser() {
        currentUserObj = totalUsers.find(u => u.name === currentUser.name)
        this.getUserById(currentUserObj.id)
    }
    
    static getUsers() {
        return fetch(baseURL + '/users') 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           totalUsers = json
        })

    }

    static async getUserById(id) {
        return fetch(baseURL + "/users/" + `${id}`) 
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
           console.log('individual user data', json)
           lastFmApi.displayUserSongs(json)
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
