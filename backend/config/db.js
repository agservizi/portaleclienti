const mysql = require("mysql2");

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
        process.exit(1); // Termina l'applicazione in caso di errore
    } else {
        console.log("Connesso al database MySQL");
    }
});

// Esporta la connessione per utilizzarla in altri moduli
module.exports = db;