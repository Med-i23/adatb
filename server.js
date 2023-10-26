const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbConfig = {
    host: 'localhost',
    user: 'adatb',
    password: 'adatb',
    database: 'adatb',
};

app.use(express.static('public'));

app.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Jelszó nem egyezik!');
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        connection.end();
        res.status(200).send('Sikeres regisztráció');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Sikertelen regisztráció');
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        connection.end();
        if (results.length === 1) {
            res.status(200).send('Sikeres belépés');
        } else {
            res.status(401).send('Helyetelen felhasználó név vagy jelszó');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Sikertelen belépés');
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
