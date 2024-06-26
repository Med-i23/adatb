const mysql = require('mysql2/promise');

class QuestionsDao{
    async createQuestion(test_id, text, score, correct_answer, wrong_answer1, wrong_answer2){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO question (test_id, text, score, correct_answer, wrong_answer1, wrong_answer2) VALUES (?, ?, ?, ?, ?, ?)', [test_id, text, score, correct_answer, wrong_answer1, wrong_answer2]);
        connection.end();
        return;
    }

    async updateQuestion(id, text, score, correct_answer, wrong_answer1, wrong_answer2){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.execute('UPDATE question SET text=?, score=?, correct_answer=?, wrong_answer1=?, wrong_answer2=? WHERE id = ?', [text, score, correct_answer, wrong_answer1, wrong_answer2, id]);
        connection.end();
        return;
    };

    async deleteQuestion(id) {
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        await connection.execute('DELETE FROM question WHERE id = ? ', [id]);
        connection.end();
        return;
    };

    async getNumberOfQuestionsByTestID(test_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const results= await connection.execute('SELECT COUNT(test_id) AS number FROM question WHERE test_id=?', [test_id]);
        connection.end();
        return results[0][0];
    }

    async getQuestions(){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results,query]= await connection.execute('SELECT * FROM question');
        connection.end();
        return results;
    }

    async getQuestionById(id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const results= await connection.execute('SELECT * FROM question WHERE id=?', [id]);
        connection.end();
        return results[0][0];
    }

    async getQuestionsByTestId(test_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results,query]= await connection.execute('SELECT * FROM question WHERE test_id=?', [test_id]);
        connection.end();
        return results;
    }

    async getTestNames(){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        const [results,query]= await connection.execute('SELECT name FROM `question` JOIN test ON question.test_id = test.id');
        connection.end();
        return results;
    }

    async getQuestionCountOfAllTest(){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        const [results,query]= await connection.execute('SELECT COUNT(test_id) AS count FROM question GROUP BY test_id ORDER by test_id');
        connection.end();
        return results;
    }

}

module.exports = QuestionsDao;