const searchStock = require('../../services/stockSearchServices/searchStockService');
require("dotenv").config();

module.exports = async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const token = process.env.PRODUCTION_TOKEN;
        const response = await searchStock(symbol, token);
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }
};