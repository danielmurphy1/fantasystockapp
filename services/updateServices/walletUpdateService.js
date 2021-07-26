const pool = require('../../database/pool');

async function walletUpdate(balance, user) {
    const { rows } = await pool.query(`
        UPDATE users
        SET wallet_balance = $1
        WHERE id = $2
        RETURNING *;
    `, [balance, user])
    
    return rows;
};

module.exports = walletUpdate;