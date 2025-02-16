const db = require("../config/db");

class Richiesta {
    static findByUserId(userId, callback) {
        const query = "SELECT * FROM richieste WHERE user_id = ?";
        db.query(query, [userId], callback);
    }

    static create(data, callback) {
        const query = "INSERT INTO richieste (cliente, servizio, data_richiesta, stato, user_id) VALUES (?, ?, ?, ?, ?)";
        db.query(query, [data.cliente, data.servizio, data.data_richiesta, data.stato, data.user_id], callback);
    }
}

module.exports = Richiesta;