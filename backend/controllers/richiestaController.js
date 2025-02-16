const Richiesta = require("../models/Richiesta");

exports.getRichiesteByUserId = (req, res) => {
    const userId = req.params.userId;

    Richiesta.findByUserId(userId, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createRichiesta = (req, res) => {
    const { cliente, servizio, data_richiesta, stato, user_id } = req.body;

    Richiesta.create({ cliente, servizio, data_richiesta, stato, user_id }, (err, results) => {
        if (err) throw err;
        res.json({ success: true, message: "Richiesta creata con successo" });
    });
};