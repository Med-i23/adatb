const express = require("express");
const UsersDAO = require('../dao/users-dao');
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
    await new UsersDAO().createUsers(username, password, fullname, "ROLE_STUDENT");
    return res.render('index', {
        current_role: null,
        token: null,
        hibaLogin: "Sikeres Regisztráció",
        hibaRegister:null
    });



});