const express = require("express");
const UsersDAO = require('../dao/users-dao');
const TestsDAO = require('../dao/tests-dao');
const questionsDAO = require('../dao/questions-dao');
//többi dao ide jön

const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
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
        if (password===user.password){
            const token = jwt.sign({
                    user:user,
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
            return res.redirect('/main');

        }else {
            return res.render('index', {
                current_role: null,
                token: null,
                hibaLogin:"Nem jó a jelszó.",
                hibaRegister:null
            });

        }
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
    await new UsersDAO().createUsers(name, username, password, "ROLE_STUDENT");
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
    let questions = await new questionsDAO().getQuestions();

    return res.render('questions', {
        current_username: current_username,
        current_role: current_role,
        all_questions: questions
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

    await new questionsDAO().createQuestion(0, question, score, correct_answer, wrong_answer1, wrong_answer2);
    res.redirect("/questions");

});

router.get("/editQuestion/:id", async (req, res) => {
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

    let current_question = await new questionsDAO().getQuestionById(id);

    return res.render('updateQuestion', {
        id:id,
        current_username: current_username,
        current_role: current_role,
        question: current_question
    });
});

router.post("/editQuestion", async (req, res) => {
    let {ev} = req.body;
    let {name} = req.body;
    let {id} = req.body;


    const van_e_osztaly = await new OsztalyDAO().getOsztalyByOsztaly(ev,name);
    if (name===""||ev===""||van_e_osztaly){
        res.redirect("/classData");
    }else{
        await new OsztalyDAO().editOsztaly(id,ev,name);
        res.redirect("/classData");
    }
});


module.exports = router;