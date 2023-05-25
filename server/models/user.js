const e = require("express");

let db = [
    {id: 1, username: 'John', password: '111'},
    {id: 2, username: 'Edward', password: '222'}
];

module.exports = class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    validate() {
        const index = db.findIndex(user => user.username == this.username & user.password == this.password);
        let token;
        if(index != -1){
            token = {username: db[index].username, accessToken: db[index].id + "-" + db[index].username + "-" + Date.now().toString()}
        }else{
            token = {error: 'Invalid username and password!'}
        }
        return token;
    }
}