const {pool} = require('../../database/pool');

async function signup(username, password) {
    const { rows } = await pool.query(`
        INSERT INTO users (username, password)
        VALUES
            ($1, $2)
            RETURNING *;
    `, [username, password])

    return rows;
};

module.exports = signup;