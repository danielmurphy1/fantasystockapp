const pool = require('../../database/pool');

async function walletUpdate(balance, user) {
    const { rows } = await pool.query(`
        UPDATE test_users
        SET wallet_ballance = $1
        WHERE id = $2
        RETURNING *;
    `, [balance, user])
    
    return rows;
};

module.exports = walletUpdate;