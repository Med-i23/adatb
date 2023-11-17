const express = require("express");
const bcrypt = require("bcrypt");
const UsersDAO = require('../dao/users-dao');
const QuestionsDAO = require('../dao/questions-dao');
const TestsDAO = require('../dao/tests-dao');
const CompletionDAO = require('../dao/completions-dao');
const AnswersDAO = require('../dao/answers-dao');
//többi dao ide jön

const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const {options} = require("pg/lib/defaults");
const router = express.Router();

//main region
router.get("/", async (req, res) => {
    const token = req.cookies.jwt;
    let current_username;
    let current_name;
    let current_role;
    let current_id;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_name= decodedToken.name;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }
    return res.render('index', {
        current_username: current_username,
        current_name:current_name,
        current_role: current_role,
        current_id: current_id,
        token: token,
        hibaLogin:null,
        hibaRegister:null
    });
});

router.post("/login", async(req, res) => {
    let {username} = req.body;
    let {password} = req.body;


    const user = await new UsersDAO().getUsersByUserName(username);

    if (user){
        bcrypt.compare(password, user.password).then(async function (result) {
            if (result) {
                const token = jwt.sign({
                        user: user,
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        role: user.role
                    },
                    jwtSecret.jwtSecret
                );
                res.cookie("jwt", token, {
                    httpOnly: true
                });
                await new UsersDAO().changeUserLoggedin(username);
                return res.redirect('/main')
            } else {
                return res.render('index', {
                    current_role: null,
                    token: null,
                    hibaLogin: "Nem jó a jelszó.",
                    hibaRegister: null
                });

            }
        });

    }else {
        return res.render('index', {
            current_role: null,
            token: null,
            hibaLogin:"Nem létező felhasználónév.",
            hibaRegister:null
        });
    }


});

router.get("/logout", async(req, res) => {
    const token = req.cookies.jwt;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
        });
    }
    await new UsersDAO().changeUserLoggedin(current_username);

    res.cookie("jwt", "", {
        maxAge: "1"
    })
    res.redirect("/")
});

router.post("/register", async(req, res) => {
    let {name} = req.body;
    let {username} = req.body;
    let {password} = req.body;
    let {password2} = req.body;

    const van_e_user = await new UsersDAO().getUsersByUserName(username);
    if (van_e_user){
        return res.render('index', {
            current_role: null,
            token: null,
            hibaLogin: null,
            hibaRegister:"Ez a felhasználónév már foglalt"
        });
    }if (password!==password2){
        return res.render('index', {
            current_role: null,
            token: null,
            hibaLogin: null,
            hibaRegister:"A két jelszó nem ugyanaz"
        });
    }if (name===""||password===""||password2===""||username===""){
        return res.render('index', {
            current_role: null,
            token: null,
            hibaLogin: null,
            hibaRegister:"Minden mezőt kötelező kitölteni"
        });

    }

    bcrypt.hash(password, 10).then(async (hash) => {
        await new UsersDAO().createUsers(name, username, hash, "ROLE_STUDENT");
    });
    return res.render('index', {
        current_role: null,
        token: null,
        hibaLogin: "Sikeres Regisztráció",
        hibaRegister:null
    });



});

router.get("/main", async (req, res) => {
    const token = req.cookies.jwt;
    let current_username;
    let current_role;
    let current_id;
    let current_name;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_name= decodedToken.name;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }


    return res.render('main', {
        current_username: current_username,
        current_name:current_name,
        current_role: current_role,
        current_id: current_id,
    });
});
//#endregion


//#region-questions

router.get("/questions", async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }
    let questions = await new QuestionsDAO().getQuestions();

    let names = await new QuestionsDAO().getTestNames();

    return res.render('questions', {
        current_username: current_username,
        current_role: current_role,
        all_questions: questions,
        names: names,
        confirm_message: null
    });

});

router.get("/createQuestions", async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }

    return res.render('createQuestions', {
        current_username: current_username,
        current_role: current_role,
    });

});

router.post("/addQuestion", async(req, res) => {
    let {question} = req.body;
    let {correct_answer} = req.body;
    let {wrong_answer1} = req.body;
    let {wrong_answer2} = req.body;
    let {score} = req.body;

    await new QuestionsDAO().createQuestion(question, score, correct_answer, wrong_answer1, wrong_answer2);
    res.redirect("/questions");
});

router.get("/updateQuestion/:id", async (req, res) => {
    const token = req.cookies.jwt;
    let id = req.params.id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }

    const current_question = await new QuestionsDAO().getQuestionById(id);

    return res.render('updateQuestion', {
        id:id,
        current_username: current_username,
        current_role: current_role,
        current_question: current_question
    });
});

router.post("/editQuestion/:id", async (req, res) => {
    let id = req.params.id;
    let{text} = req.body;
    let{correct_answer} = req.body;
    let{wrong_answer1} = req.body;
    let{wrong_answer2} = req.body;
    let{score} = req.body;


    await new QuestionsDAO().updateQuestion(id, text, score, correct_answer, wrong_answer1, wrong_answer2);
    res.redirect('/questions');

});




router.post("/deleteQuestion/:id", async (req, res) => {
    const token = req.cookies.jwt;
    let id = req.params.id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }

    await new QuestionsDAO().deleteQuestion(id);
    let questions = await new QuestionsDAO().getQuestions();

    return res.render('questions', {
        current_username: current_username,
        current_role: current_role,
        all_questions: questions,
        confirm_message: "Question deleted Successfully"
    });
});



//#end-region

//#test-region
router.get("/tests", async (req, res) => {
    const token = req.cookies.jwt;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }
    let tests = await new TestsDAO().getTests();

    return res.render('tests', {
        current_username: current_username,
        current_role: current_role,
        all_test: tests,
        confirm_message: null
    });

});

router.post("/deleteTest/:id", async (req, res) => {
    const token = req.cookies.jwt;
    let id = req.params.id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }

    await new TestsDAO().deleteTestandQuestionsForIt(id);

    return res.redirect('/tests')
});


router.get("/doTest/:id", async (req, res) => {
    const token = req.cookies.jwt;
    let date = new Date();
    let test_id = req.params.id;
    let current_role;
    let current_username;
    let current_id;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    let test = await new TestsDAO().getTestById(test_id);
    let questions = await new QuestionsDAO().getQuestionsByTestId(test_id);

    await new CompletionDAO().createCompletion(test_id, current_id, date);

    return res.render('test', {
        id: test_id,
        date: date,
        current_username: current_username,
        current_role: current_role,
        current_id: current_id,
        test: test,
        questions: questions
    });

});

router.post("/giveInTest/:id", async (req, res) => {
    const token = req.cookies.jwt;
    const test_id = req.params.id;
    let current_role;
    let current_username;
    let current_id;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    const questions = await new QuestionsDAO().getQuestionsByTestId(test_id);
    const {current_completion} = await new CompletionDAO().getLastCompletionOfUserById(current_id);
    let score = 0;
    let all_score = 0;
    let current_answer;
    let correct_incorrect;

    for (let i = 0; i < questions.length; i++) {
        const selectedOption = req.body['options[]'][i];
        if (selectedOption === 'correct_answer') {
            current_answer = questions[i].correct_answer;
            score = questions[i].score;
            correct_incorrect = 'correct';
        }
        if(selectedOption === 'wrong_answer1'){
            current_answer = questions[i].wrong_answer1;
            score = 0;
            correct_incorrect = 'incorrect';
        }
        if(selectedOption === 'wrong_answer2'){
            current_answer = questions[i].wrong_answer2;
            score = 0;
            correct_incorrect = 'incorrect';
        }
        await new AnswersDAO().createAnswer(current_completion, current_answer, correct_incorrect, score);
        all_score += score;
    }

    await new CompletionDAO().updateCompletionScore(all_score, current_completion);
    return res.redirect("/results");
});


router.get("/createTest", async (req, res) => {
    const token = req.cookies.jwt;
    let current_id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_id = decodedToken.id;
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }

    return res.render('createTest', {
        current_id: current_id,
        current_username: current_username,
        current_role: current_role,
        message: null
    });

});


router.post("/addTest", async (req, res) => {
    const token = req.cookies.jwt;
    let {name} = req.body;
    let {noq} = req.body;
    let {minpoint} = req.body;
    let date = new Date();
    let current_id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_id = decodedToken.id;
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }

    let is_there = await new TestsDAO().getTestName(name);
    if(is_there){
        return res.render('createTest', {
            current_id: current_id,
            current_username: current_username,
            current_role: current_role,
            message: "Name Already Exists"
        });
    }
    else{
        await new TestsDAO().createTest(current_id, name, date, minpoint, noq);
        return res.redirect("/tests");
    }


});

router.get("/updateTest/:id", async(req, res) => {
    const token = req.cookies.jwt;
    let test_id = req.params.id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }


    let test = await new TestsDAO().getTestById(test_id);

    return res.render('updateTest', {
        current_username: current_username,
        current_role: current_role,
        test: test,
        test_id: test_id,
        error_message: null
    });

});

router.post("/updateTestQ/:id", async (req, res) => {
    let test_id = req.params.id;
    let {question} = req.body;
    let {score} = req.body;
    let {correct_answer} = req.body;
    let {wrong_answer1} = req.body;
    let {wrong_answer2} = req.body;
    const token = req.cookies.jwt;
    let current_role;
    let current_username;
    let current_id;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    const {noq} = await new TestsDAO().getTestNoq(test_id);
    const {number} = await new QuestionsDAO().getNumberOfQuestionsByTestID(test_id);

    let tests = await new TestsDAO().getTests();

    if(noq > number){
        await new QuestionsDAO().createQuestion(test_id, question, score, correct_answer, wrong_answer1, wrong_answer2);
        return res.redirect("/tests");
    }
    else {
        return res.render('tests', {
            current_role: current_role,
            current_id: current_id,
            current_username: current_username,
            message: "Maximum message capacity!",
            all_test: tests
        });
    }

});

router.post("/changeTestName/:id", async (req, res) => {
    const token = req.cookies.jwt;
    let id = req.params.id;
    let {name} = req.body;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
        });
    }

    let test = await new TestsDAO().getTestById(id);
    let is_there = await new TestsDAO().getTestName(name);

    if(is_there){
        return res.render('updateTest', {
            current_username: current_username,
            current_role: current_role,
            error_message: "Name Already Exists",
            test: test,
            test_id: id
        });

    }
    else{
        await new TestsDAO().changeTestName(id, name);
        return res.redirect("/tests");
    }


});
//#end-region

//#results-region

router.get("/results", async(req, res) => {
    const token = req.cookies.jwt;
    let current_id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    let tests = await new TestsDAO().getTests();
    const passedTests = await new CompletionDAO().passedTestsOfUser(current_id);

    return res.render('results', {
        current_username: current_username,
        current_role: current_role,
        current_id: current_id,
        all_test: tests,
        passedTests: passedTests
    });

});

router.get("/allResults/:id", async(req, res) => {
    const token = req.cookies.jwt;
    const id = req.params.id;
    let current_id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    let test = await new TestsDAO().getTestById(id);
    let all_completions = await new CompletionDAO().getCompletionsByTestId(id);

    return res.render('allResults', {
        current_username: current_username,
        current_role: current_role,
        current_id: current_id,
        test: test,
        all_completions: all_completions
    });

});


router.get("/userResult/:id", async(req, res) => {
    const token = req.cookies.jwt;
    const id = req.params.id;
    let current_id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    let user_completions = await new CompletionDAO().getCompletionOfUserOnTest(id, current_id);
    let id_list = await new CompletionDAO().getCompletionOfUserOnTestIdList(id, current_id);

    return res.render('userResult', {
        current_username: current_username,
        current_role: current_role,
        current_id: current_id,
        user_completions: user_completions,
        id_list: id_list
    });

});

router.get("/userAnswers/:id", async(req, res) => {
    const token = req.cookies.jwt;
    const id = req.params.id;
    let current_id;
    let current_role;
    let current_username;
    if (token) {
        jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
            current_username = decodedToken.username;
            current_role = decodedToken.role;
            current_id = decodedToken.id;
        });
    }

    let answers = await new AnswersDAO().getAnswersOfCompletions(id);

    console.log(answers[0]);

    return res.render('userAnswers', {
        current_username: current_username,
        current_role: current_role,
        current_id: current_id,
        answers: answers
    });

});


module.exports = router;