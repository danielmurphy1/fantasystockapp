const express = require('express');
const StocksController = require('../controllers/stocks-controller');
const {buyNewStockController, buyOldSharesController} = require('../controllers/transactionControllers/buySharesController');
const sellSharesController = require('../controllers/transactionControllers/sellSharesController');
const holdingsValueUpdateController = require('../controllers/updateControllers/holdingsValueUpdateController');
const stockSearchController = require('../controllers/stockSearchControllers/stockSearchController');
const chartSearchController = require('../controllers/stockSearchControllers/chartSearchController');
const isAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/api/search/:symbol', isAuth, stockSearchController);

router.get('/api/search/chart/:symbol', isAuth, chartSearchController);

router.get('/api/portfolio/:userId', isAuth, async (req, res) => {
    try {
        const { userId } = req.params;
        const portfolioData = await StocksController.getPortfolio(userId);
        res.send(portfolioData);
    } catch (error) {
        res.send(error);
    }
});

router.get('/api/stocks/:userId', isAuth, async (req, res) => {
    try {
        const { userId } = req.params;
        const userData = await StocksController.getUserHoldings(userId);
        res.send(userData);
    } catch (error) {
        res.send(error);
    }
});

router.post('/api/stocks/new', isAuth, buyNewStockController);

router.put('/api/stocks/buy', isAuth, buyOldSharesController);

router.put('/api/stocks/sell', isAuth, sellSharesController);

router.put('/api/stocks/update', isAuth, holdingsValueUpdateController);

module.exports = router;