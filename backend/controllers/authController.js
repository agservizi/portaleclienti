const bcrypt = require("bcrypt");

exports.login = (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Errore durante il login:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }

        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, match) => {
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
