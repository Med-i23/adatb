const mysql = require('mysql2/promise');

class TestsDao{
    async createTest(creator_id, name, creationdate, minpoint){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO test (creator_id, name, creationdate, minpoint) VALUES (?, ?, ?, ?)', [creator_id, name, creationdate, minpoint])
        connection.end();
        return;
    }
    async editTest(creator_id, name, creationdate, minpoint, id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'orarend'});
        await connection.execute('UPDATE test SET creator_id=?, name=?, creationdate=?, minpoint=? WHERE id = ?', [creator_id, name, creationdate, minpoint, id]);
        connection.end();
    };

    async getTestIdByName(name){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results,query]= await connection.execute('SELECT id FROM test WHERE ?'[name]);
        connection.end();
        return results;
    }
}

module.exports = TestsDao;