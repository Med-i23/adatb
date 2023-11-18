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

    /*getting the last compl-id to insert into the answers*/
    async getLastCompletionOfUserById(completer_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const results= await connection.execute('SELECT id AS current_completion FROM completion WHERE completer_id=? ORDER BY id DESC LIMIT 1', [completer_id]);
        connection.end();
        return results[0][0];
    }

    /*for listing the completions of a user on a given test*/
    async getCompletionOfUserOnTest(test_id, completer_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query] = await connection.execute('SELECT * FROM `completion` JOIN test ON test.id = completion.test_id WHERE test_id = ? and completer_id=?', [test_id, completer_id]);
        connection.end();
        return results;
    }

    /*seperate id list for the answer listing */
    async getCompletionOfUserOnTestIdList(test_id, completer_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query] = await connection.execute('SELECT completion.id FROM `completion` JOIN test ON test.id = completion.test_id WHERE test_id = ? and completer_id=?', [test_id, completer_id]);
        connection.end();
        return results;
    }

    /*getting all completions of all users on a test*/
    async getCompletionsByTestId(test_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query]= await connection.execute('SELECT * FROM completion JOIN user ON completion.completer_id=user.id JOIN test ON test.id = completion.test_id WHERE test_id=? ORDER BY user.username', [test_id]);
        connection.end();
        return results;
    }

    /*getting the list of Full names of completers in order*/
    async getCompletionsFullNamesListByTestId(test_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query]= await connection.execute('SELECT user.name FROM completion JOIN user ON completion.completer_id=user.id JOIN test ON test.id = completion.test_id WHERE test_id=? ORDER BY user.username', [test_id]);
        connection.end();
        return results;
    }

    /*seperate id list for the answer listing by all users*/
    async getCompletionOfAllUserOnTestIdList(test_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query] = await connection.execute('SELECT completion.id FROM completion JOIN user ON completion.completer_id=user.id JOIN test ON test.id = completion.test_id WHERE test_id=? ORDER BY user.username;', [test_id]);
        connection.end();
        return results;
    }


    /*getting the names of tests that the user passed*/
    async getAllCompletionOfUser(completer_id){
        const connection = await mysql.createConnection({host:'localhost',user:'root',database:'moodletest'});
        const [results, query]= await connection.execute('SELECT * FROM completion JOIN test ON completion.test_id = test.id WHERE completer_id=9;', [completer_id]);
        connection.end();
        return results;
    }

}

module.exports = CompletionsDao;