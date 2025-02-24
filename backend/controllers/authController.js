const bcrypt = require("bcrypt");
const db = require("../config/db");

// 🔹 REGISTRAZIONE UTENTE (SOLO CLIENTI)
exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Tutti i campi sono obbligatori." });
    }

    // Hash della password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Errore durante l'hashing della password:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }

        // Imposta il tipo di utente su "cliente"
        const type = "cliente";

        // Inserisci il nuovo utente nel database
        const query = "INSERT INTO users (username, password, type) VALUES (?, ?, ?)";
        db.run(query, [username, hash, type], function (err) {
            if (err) {
                console.error("Errore durante la registrazione:", err);
                return res.status(500).json({ success: false, message: "Errore del server" });
            }
            res.json({ success: true, message: "Utente registrato con successo" });
        });
    });
};

// 🔹 LOGIN UTENTE
exports.login = (req, res) => {
    const { username, password } = req.body;

    console.log("Tentativo di login con:", username); // 🔍 LOG

    const query = "SELECT * FROM users WHERE username = ?";
    db.get(query, [username], (err, user) => {
        if (err) {
            console.error("Errore SQL:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }

        if (user) {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error("Errore bcrypt:", err);
                    return res.status(500).json({ success: false, message: "Errore del server" });
                }

                console.log("Confronto password:", match); // 🔍 LOG

                if (match) {
                    res.json({ success: true, user });
                } else {
                    res.json({ success: false, message: "Credenziali non valide" });
                }
            });
        } else {
            res.json({ success: false, message: "Credenziali non valide" });
        }
    });
};
