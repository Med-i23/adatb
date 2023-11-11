const mysql = require('mysql2/promise');

class CompletionsDao{
    async createCompletion(test_id, completer_id, date, score){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.query('INSERT INTO completion (test_id, completer_id, date, score) VALUES (?, ?, ?, ?)', [test_id, completer_id, date, score]);
        connection.end();
        return;
    }

    async updateCompletionScore(score){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.query('UPDATE completion SET score=? WHERE id', [score]);
        connection.end();
        return;
    }

    async getLastCompletionId(){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const results= await connection.execute('SELECT id FROM completion ORDER BY id DESC LIMIT 1;');
        connection.end();
        return results[0][0];
    }
}

module.exports = CompletionsDao;