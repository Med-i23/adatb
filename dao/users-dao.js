const mysql = require('mysql2/promise');

class UsersDAO {
    async createUsers(username, password, fullname, role){
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'})
        await connection.query('INSERT INTO users (Username, Password, FullName, Role) VALUES (?, ?, ?, ?)', [username, password, fullname, role])
        connection.end();
        return;
    }

    async modifyUsers(id, username, password, fullname, role) {
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'});
        await connection.query('UPDATE users SET Username=?, Password=?, FullName=?, Role=? WHERE id = ?', [username, password, fullname, role]);
        connection.end();
        return;
    };

    async deleteUsers(id) {
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'});
        await connection.execute('DELETE FROM users WHERE id = ? ', [id]);
        connection.end();
        return;
    };

    async getUsers() {
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'});
        const [adatok,query]= await connection.execute('SELECT * FROM users ');
        connection.end();
        return(adatok);
    };

    async getUsersByUserName(username) {
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'});
        const query= await connection.execute('SELECT * FROM felhasznalo WHERE username = ? ', [username]);
        connection.end();
        return query[0][0];
    };

    async getUsersByID(id) {
        const connection = await mysql.createConnection({host:'localhost',user:'adatb',database:'adatb'});
        const query= await connection.execute('SELECT * FROM felhasznalo WHERE id = ? ', [id]);
        connection.end();
        return query[0][0];
    };
}

module.exports = UsersDAO;