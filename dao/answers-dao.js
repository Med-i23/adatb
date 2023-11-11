const mysql = require('mysql2/promise');

class AnswersDao{
    async createAnswer(completion_id, text, correct_incorrect){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO answer (completion_id, text, correct_incorrect) VALUES (?, ?, ?, ?)', [completion_id, text, correct_incorrect]);
        connection.end();
        return;
    }

}

module.exports = AnswersDao;