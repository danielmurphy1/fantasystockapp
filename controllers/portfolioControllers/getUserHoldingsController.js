const getUserHoldings = require('../../services/portfolioServices/getUserHoldingsService');

module.exports = async (req, res) => {
    try {
        const { userId } = req.params;
        const holdingsData = await getUserHoldings(userId);
        res.send(holdingsData);
    } catch (error) {
        res.send(error);
    }
};