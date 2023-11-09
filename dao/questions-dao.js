const mysql = require('mysql2/promise');

class QuestionsDao{
    async createQuestion(text, score, correct_answer, wrong_anwser1, wrong_anwser2){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('INSERT INTO question (text, score, correct_answer, wrong_answer1, wrong_answer2) VALUES (?, ?, ?, ?, ?)', [text, score, correct_answer, wrong_anwser1, wrong_anwser2]);
        connection.end();
        return;
    }


    async getQuestions(){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results,query]= await connection.execute('SELECT text, score, correct_answer, wrong_answer1, wrong_answer2  FROM question');
        connection.end();
        return results;
    }

    async getQuestionById(id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results,query]= await connection.execute('SELECT * FROM question WHERE id=?', [id]);
        connection.end();
        return results;
    }


    async getQuestionsByText(text){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results,query]= await connection.execute('SELECT text FROM question WHERE LIKE text');
        connection.end();
        return results;
    }

    async asignTestToQuestion(test_id, text){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'})
        await connection.query('UPDATE question SET test_id=? WHERE text=?', [test_id, text])
        connection.end();
        return;
    }

    async duplicateQuestionOnAsign(test_id, text, score, correct_answer, wrong_anwser1, wrong_anwser2){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'orarend'});
        await connection.execute('UPDATE ora SET osztaly_id=? , tanar_id=? , terem_id=? , oranev=? , nap=? , ora=? WHERE id = ?', [osztaly_id , tanar_id , terem_id , oranev , nap , ora, id]);
        this.asignTestToQuestion(test_id, text);
        connection.end();
        return;
    }
}

module.exports = QuestionsDao;