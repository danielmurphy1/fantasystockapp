const { buyShares, buyNewStock } = require('../services/buyingService');

exports.buyOldSharesController = async (req, res) => {
    const { newShares, userId, symbol, newValue } = req.body;
    try {        
        const purchasedShares = await buyShares(newShares, userId, symbol, newValue);
        res.send(purchasedShares);
    } catch (error) {
        res.send(error);
    }
};

exports.buyNewStockController = async (req, res) => {
    try {
        const { userId, symbol, companyName, sharesToBuy, sharesValue } = req.body;
        const newStock = await buyNewStock(userId, symbol, companyName, sharesToBuy, sharesValue);
        res.send(newStock);
    } catch (error) {
        res.send(error);
    }
};