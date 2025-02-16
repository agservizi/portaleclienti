const User = require("../models/User");

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) {
            console.error("Errore durante il login:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }

        if (results.length > 0 && results[0].password === password) {
            res.json({ success: true, user: results[0] });
        } else {
            res.json({ success: false, message: "Credenziali non valide" });
        }
    });
};