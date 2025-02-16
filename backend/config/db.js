const mysql = require("mysql");

// Configurazione della connessione al database
const db = mysql.createConnection({
    host: "127.0.0.1", // O l'indirizzo del server MySQL
    user: "u427445037_coresuite", // Nome utente del database
    password: "Giogiu2123@", // Password del database
    database: "u427445037_coresuite", // Nome del database
});

// Connessione al database
db.connect((err) => {
    if (err) {
        console.error("Errore durante la connessione al database:", err);
        return;
    }
    console.log("Connessione al database riuscita!");
});

module.exports = db;
