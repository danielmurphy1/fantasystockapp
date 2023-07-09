const {searchStock, priceSearch} = require('../../services/stockSearchServices/searchStockService');
require("dotenv").config();

module.exports = async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const token = process.env.PRODUCTION_TOKEN;
        const searchResponse = await searchStock(symbol, token);
        const priceReponse = await priceSearch(symbol, token);
        const fullResponse = {
            searchResponse: searchResponse.data,
            priceResponse: priceReponse.data
        }
        res.send(fullResponse);
    } catch (error) {
        res.send(error);
    }
};