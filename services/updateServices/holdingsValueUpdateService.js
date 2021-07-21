const pool = require('../../database/pool');

async function updateValues(newValue, userId, symbol) {
    const { rows } = await pool.query(`
        UPDATE test_user_stocks
        SET shares_value = $1
        WHERE user_id = $2 AND symbol = $3
        RETURNING *; 
    `, [newValue, userId, symbol])

    return rows;
};