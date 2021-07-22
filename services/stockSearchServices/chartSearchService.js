const axios = require('axios');

async function searchChart(symbol, token) {
    const response = axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1w?token=${token}`);

    return response;
};

module.exports = searchChart;