const axios = require('axios');

async function searchChart(symbol, token) {
    // const response = axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1w?token=${token}`);
    const response = axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=5&apikey=${token}`);


    return response;
};

module.exports = searchChart;