const mysql = require('mysql2/promise');

class UsersDao {
    async createUsers(username, password, fullname, email, role){
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'})
        await connection.query('INSERT INTO users (Username, Password, FullName, Email, Role) VALUES (?, ?, ?, ?)', [name, username, password, role])
        connection.end();
        return;
    }

    async modifyUsers(id, username, password, fullname, email, role) {
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'});
        await connection.query('UPDATE users SET Username=?, Password=?, FullName=?, Email=?, Role=? WHERE id = ?', [name, username, password, fullname, email, role]);
        connection.end();
        return;
    };

}