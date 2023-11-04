const mysql = require('mysql2/promise');

class FelhasznaloDAO{
    async createFelhasznalo(username, password, fullname, email, role){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'adatb'})
        await connection.query('INSERT INTO users (Username, Password, FullName, Email, Role) VALUES (?, ?, ?, ?)', [name, username, password, role])
        connection.end();
        return;
    }

    async modositFelhasznalok(id, username, password, fullname, email, role) {
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'orarend'});
        await connection.query('UPDATE users SET Username=?, Password=?, FullName=?, Email=?, Role=? WHERE id = ?', [name, username, password, fullname, email, role]);
        connection.end();
        return;
    };

}