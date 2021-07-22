const searchChart = require('../../services/stockSearchServices/chartSearchService');
require("dotenv").config();

module.exports = async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const token = process.env.PRODUCTION_TOKEN;
        const response = await searchChart(symbol, token);
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }
};