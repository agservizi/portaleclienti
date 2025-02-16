const db = require("../config/db");

class Contratto {
    static findByUserId(userId, callback) {
        const query = "SELECT * FROM contratti WHERE user_id = ?";
        db.query(query, [userId], callback);
    }
}

module.exports = Contratto;