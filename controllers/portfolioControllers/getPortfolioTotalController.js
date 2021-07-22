const getPortfolioTotal = require('../../services/portfolioServices/getPortfolioTotalService');

module.exports = async (req, res) => {
    try {
        const { userId } = req.params;
        const portfolioData = await getPortfolioTotal(userId);
        res.send(portfolioData);
    } catch (error) {
        res.send(error);
    }
};