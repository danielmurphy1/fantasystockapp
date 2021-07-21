const pool = require('../../database/pool');

async function sellShares(newShares, userId, symbol, newValue) {
    if (newShares === 0) {
        const { rows } = await pool.query(`
            DELETE from test_user_stocks
            WHERE symbol = $1 AND user_id = $2
            RETURNING *;
        `, [symbol, userId])

        return rows;
    } else {
        const { rows } = await pool.query(`
            UPDATE test_user_stocks
            SET shares_owned = $1,
                shares_value = $2
            WHERE user_id = $3 AND symbol = $4
            RETURNING *; 
        `, [newShares, newValue, userId, symbol])

        return rows;
    }
};

module.exports = sellShares;