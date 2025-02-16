const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "u427445037_coresuite",
    user: "u427445037_coresuite",
    password: "Giogiu2123@",
    database: "coresuite",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connesso al database MySQL");
});

module.exports = db;