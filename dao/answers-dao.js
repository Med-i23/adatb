const mysql = require('mysql2/promise');

class AnswersDao{
    async createAnswer(completion_id, text, correct_incorrect, score){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO `answers` (id, completion_id, text, correct_incorrect, score) VALUES (NULL, ?, ?, ?, ?)', [completion_id, text, correct_incorrect, score]);
        connection.end();
        return;
    }

}

module.exports = AnswersDao;