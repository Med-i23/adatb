const mysql = require('mysql2/promise');

class AnswersDao{
    async createAnswer(completion_id, text, correct_incorrect, score){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO `answers` (id, completion_id, text, correct_incorrect, score) VALUES (NULL, ?, ?, ?, ?)', [completion_id, text, correct_incorrect, score]);
        connection.end();
        return;
    }

    async getAnswersOfCompletions(completion_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query]= await connection.execute('SELECT * FROM answers WHERE completion_id=?', [completion_id]);
        connection.end();
        return results;
    }

}

module.exports = AnswersDao;