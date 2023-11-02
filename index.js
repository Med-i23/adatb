const express = require("express");
const path = require("path");
const app = express();
const routeFelhasznalo = require('./routes/routes');
const PORT = process.env.PORT || 6060;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(routeFelhasznalo);
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));




app.listen(PORT, () => {
    console.log("Sikeres elindítás");
});