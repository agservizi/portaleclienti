const Contratto = require("../models/Contratto");

exports.getContrattiByUserId = (req, res) => {
    const userId = req.params.userId;

    Contratto.findByUserId(userId, (err, results) => {
        if (err) {
            console.error("Errore durante il recupero dei contratti:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }
        res.json(results);
    });
};