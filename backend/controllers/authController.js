const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.login = (req, res) => {
    const { username, password } = req.body;

    console.log("Tentativo di login con:", username, password); // 🔍 LOG

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Errore SQL:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }

        console.log("Risultati query:", results); // 🔍 LOG

        if (results.length > 0) {
            const user = results[0];

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
