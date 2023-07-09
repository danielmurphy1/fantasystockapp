const axios = require('axios');

async function searchStock(symbol, token) {
    // const response = axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`);
    const response = axios.get(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${token}`);
    

    return response;
};

async function priceSearch(symbol, token) {
    const response = axios.get(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${token}`);

    return response;
}

module.exports = {searchStock, priceSearch};