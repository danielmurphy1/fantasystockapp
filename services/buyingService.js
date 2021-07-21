const pool = require('../database/pool');

async function buyShares(newShares, userId, symbol, newValue) {
    const { rows } = await pool.query(`
        UPDATE test_user_stocks
        SET shares_owned = $1,
            shares_value = $2
        WHERE user_id = $3 AND symbol = $4
        RETURNING *; 
    `, [newShares, newValue, userId, symbol])

    return rows;
};

async function buyNewStock(userId, symbol, companyName, sharesToBuy, sharesValue) {
    const { rows } =  await pool.query(`
        INSERT INTO test_user_stocks (user_id, symbol, company_name, shares_owned, shares_value)
        VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *;
    `, [userId, symbol, companyName, sharesToBuy, sharesValue])

    return rows;
};

module.exports = {buyShares, buyNewStock};