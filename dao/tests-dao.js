const mysql = require('mysql2/promise');

class TestsDao{
    async createTest(creator_id, name, creationdate, minpoint, noq){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO test (creator_id, name, creationdate, minpoint, noq) VALUES (?, ?, ?, ?, ?)', [creator_id, name, creationdate, minpoint, noq])
        connection.end();
        return;
    }
    async editTest(creator_id, name, creationdate, minpoint, id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'orarend'});
        await connection.execute('UPDATE test SET creator_id=?, name=?, creationdate=?, minpoint=? WHERE id = ?', [creator_id, name, creationdate, minpoint, id]);
        connection.end();
    };

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
}

module.exports = TestsDao;