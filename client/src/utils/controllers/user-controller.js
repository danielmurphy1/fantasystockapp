const pool = require('../../pool');

class UserController { //database name will need to be changed for production - curently using 'test_NAMEOFTABLE'

    static async findByUsername(username) {
        const {rows} = await pool.query(`
            SELECT * FROM test_users
            WHERE username = $1;
        `, [username]);

        return rows;
    };

    static async signup(username, password) {
        const { rows } = await pool.query(`
            INSERT INTO test_users (username, password)
            VALUES
                ($1, $2)
                RETURNING *;
        `, [username, password])

        return rows;
    };

    static async login(username, password){

    };
        
};

module.exports = UserController;