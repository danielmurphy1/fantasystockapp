const axios = require('axios');

async function searchStock(symbol, token) {
    const response = axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`);

    return response;
};

module.exports = searchStock;