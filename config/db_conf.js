const mysql=require("mysql2/promise")
const dbConfig = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'adatb'
});

module.exports=dbConfig;

