const mysql = require('mysql2/promise');

class AnsweroptionsDao{
    async createAnsweroption(question_id, text, correct_incorrect){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO `answeroptions` (question_id, text, correct_incorrect) VALUES (?, ?, ?)', [question_id, text, correct_incorrect]);
        connection.end();
        return;
    }

}

module.exports = AnsweroptionsDao;