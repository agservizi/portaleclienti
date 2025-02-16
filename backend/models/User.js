const db = require("../config/db");

class User {
    static findByUsername(username, callback) {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], callback);
    }
}

module.exports = User;