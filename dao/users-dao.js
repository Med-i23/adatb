const mysql = require('mysql2/promise');

class UsersDAO {
    async createUsers(name, username, password){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest',password:''})
        await connection.query('INSERT INTO user (name, username, password) VALUES (?, ?, ?)', [name, username, password])
        connection.end();
        return;
    }

    async getUsersByUserName(username) {
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const query= await connection.execute('SELECT * FROM user WHERE username = ? ', [username]);
        connection.end();
        return query[0][0];
    };

    async modifyuser(id,name, username, password, role) {
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.query('UPDATE user SET name=?, username=?, password=?, role=? WHERE id = ?', [name, username, password, role, id]);
        connection.end();
        return;
    };



}

module.exports = UsersDAO;