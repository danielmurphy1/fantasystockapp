const pool = require('../../pool');
const axios = require('axios');
require("dotenv").config();



class StocksController { //database name will need to be changed for production - curently using 'test_NAMEOFTABLE'

    static async searchStock(symbol, token) {
        const response = axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`);

        return response;
    };

    static async searchChart(symbol, token) {
        const response = axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1w?token=${token}`);

        return response;
    };

    static async getPortfolio(userId) {
        const { rows } = await pool.query(`
            SELECT SUM (shares_value) as total
            FROM test_user_stocks
            WHERE user_id = $1;
        `, [userId])

        return rows;
    };

    static async getUserHoldings(userId) {
        const { rows } = await pool.query(`
            SELECT * FROM test_user_stocks
            WHERE user_id = $1;
        `, [userId])

        return rows;
    };

    static async buyNewStock(userId, symbol, companyName, sharesToBuy, sharesValue) {
        const { rows } =  await pool.query(`
            INSERT INTO test_user_stocks (user_id, symbol, company_name, shares_owned, shares_value)
            VALUES
                ($1, $2, $3, $4, $5)
                RETURNING *;
        `, [userId, symbol, companyName, sharesToBuy, sharesValue])

        return rows;
    };

    static async buyShares(newShares, userId, symbol, newValue) {
        const { rows } = await pool.query(`
            UPDATE test_user_stocks
            SET shares_owned = $1,
                shares_value = $2
            WHERE user_id = $3 AND symbol = $4
            RETURNING *; 
        `, [newShares, newValue, userId, symbol])

        return rows;
    };

    static async sellShares(newShares, userId, symbol, newValue) {
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


};

module.exports = StocksController;