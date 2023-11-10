const mysql = require('mysql2/promise');

class TestsDao{
    async createTest(creator_id, name, creationdate, minpoint, noq){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO test (creator_id, name, creationdate, minpoint, noq) VALUES (?, ?, ?, ?, ?)', [creator_id, name, creationdate, minpoint, noq])
        connection.end();
        return;
    }

    async getTestById(id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const results= await connection.execute('SELECT * FROM test WHERE id=?', [id]);
        connection.end();
        return results[0][0];
    }

    async getTests(){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results,query]= await connection.execute('SELECT * FROM test');
        connection.end();
        return results;
    }
    async getTestNoq(id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const results= await connection.execute('SELECT noq FROM test WHERE id=?', [id]);
        connection.end();
        return results[0][0];
    }

    async updateTest(id, creator_id, name, creationdate, minpoint, noq) {
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.query('UPDATE test SET id=?, creator_id=?, name=?, creationdate=?, minpoint=?, noq=? WHERE id = ?', [id, creator_id, name, creationdate, minpoint, noq, id]);
        connection.end();
        return;
    };
}

module.exports = TestsDao;