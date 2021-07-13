const pool = require('../../pool');
const axios = require('axios');
require("dotenv").config();



class StocksController { //database name will need to be changed for production - curently using 'test_NAMEOFTABLE'

    static async searchStock(symbol, token) {
        const response = axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`);

        return response;
    };

    
};

module.exports = StocksController;