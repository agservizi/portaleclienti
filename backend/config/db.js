const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portale_clienti",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connesso al database MySQL");
});

module.exports = db;