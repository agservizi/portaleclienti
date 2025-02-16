const db = require("../config/db");

exports.login = (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Errore durante il login:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }

        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.json({ success: false, message: "Credenziali non valide" });
        }
    });
};