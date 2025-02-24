const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Percorso del database SQLite
const dbPath = path.resolve(__dirname, "database.sqlite");

// Creazione della connessione al database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Errore durante la connessione al database:", err);
        return;
    }
    console.log("Connessione al database SQLite riuscita!");
});

// Creazione della tabella utenti se non esiste
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            type TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Errore durante la creazione della tabella utenti:", err);
        } else {
            console.log("Tabella utenti creata o già esistente.");
        }
    });

    // Inserimento utenti di prova
    const insertQuery = "INSERT INTO users (username, password, type) VALUES (?, ?, ?)";
    const adminPassword = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8"; // Password: administrator
    const clientePassword = "$2b$10$7QJ8K1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8Q1Q8"; // Password: clienteprova

    db.run(insertQuery, ["admin", adminPassword, "admin"], (err) => {
        if (err) {
            console.error("Errore durante l'inserimento dell'utente admin:", err);
        } else {
            console.log("Utente admin inserito con successo.");
        }
    });

    db.run(insertQuery, ["cliente", clientePassword, "cliente"], (err) => {
        if (err) {
            console.error("Errore durante l'inserimento dell'utente cliente:", err);
        } else {
            console.log("Utente cliente inserito con successo.");
        }
    });
});

module.exports = db;
