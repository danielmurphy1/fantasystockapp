const pool = require('../../database/pool');

async function getUserHoldings(userId) {
    const { rows } = await pool.query(`
        SELECT * FROM user_stocks
        WHERE user_id = $1;
    `, [userId])

    return rows;
};

module.exports = getUserHoldings;