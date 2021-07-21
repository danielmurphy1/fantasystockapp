const express = require('express');
const StocksController = require('../controllers/stocks-controller');
const {buyNewStockController, buyOldSharesController} = require('../controllers/buySharesController');
const sellSharesController = require('../controllers/sellSharesController');
const isAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/api/search/:symbol', isAuth, async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const token = process.env.PRODUCTION_TOKEN;
        const response = await StocksController.searchStock(symbol, token);
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }
});

router.get('/api/search/chart/:symbol', isAuth, async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const token = process.env.PRODUCTION_TOKEN;
        const response = await StocksController.searchChart(symbol, token);
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }
});

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

router.put('/api/stocks/update', isAuth, async (req, res) => {
    try {
        const { userId, symbol, newValue } = req.body;
        const updatedValues = await StocksController.updateValues(newValue, userId, symbol);
        res.send(updatedValues);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;