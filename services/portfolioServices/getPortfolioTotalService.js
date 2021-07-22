const pool = require('../../database/pool');

async function getPortfolioTotal(userId) {
    const { rows } = await pool.query(`
        SELECT SUM (shares_value) as total
        FROM test_user_stocks
        WHERE user_id = $1;
    `, [userId])

    return rows;
};

module.exports = getPortfolioTotal;
