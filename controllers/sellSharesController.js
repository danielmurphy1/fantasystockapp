const sellShares = require('../services/sellingService');

module.exports = async (req, res) => {
    try {
        const { newShares, userId, symbol, newValue } = req.body;
        const soldShares = await sellShares(newShares, userId, symbol, newValue);
        res.send(soldShares);
    } catch (error) {
        res.send(error);
    }
};