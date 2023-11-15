const mysql = require('mysql2/promise');

class CompletionsDao{
    async createCompletion(test_id, completer_id, date){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.query('INSERT INTO completion (test_id, completer_id, date) VALUES (?, ?, ?)', [test_id, completer_id, date]);
        connection.end();
        return;
    }

    async updateCompletionScore(score, completion_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.query('UPDATE completion SET score=? WHERE id=?', [score, completion_id]);
        connection.end();
        return;
    }

    async getLastCompletionOfUserById(completer_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const results= await connection.execute('SELECT id AS current_completion FROM completion WHERE completer_id=? ORDER BY id DESC LIMIT 1', [completer_id]);
        connection.end();
        return results[0][0];
    }

    async getCompletionsOfUserById(completer_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query]= await connection.execute('SELECT * FROM completion WHERE completer_id=?', [completer_id]);
        connection.end();
        return results;
    }

    async getCompletionsByTestId(test_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query]= await connection.execute('SELECT * FROM completion WHERE test_id=?', [test_id]);
        connection.end();
        return results;
    }

}

module.exports = CompletionsDao;