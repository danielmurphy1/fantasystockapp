const express = require('express');
const {buyNewStockController, buyOldSharesController} = require('../controllers/transactionControllers/buySharesController');
const sellSharesController = require('../controllers/transactionControllers/sellSharesController');
const holdingsValueUpdateController = require('../controllers/updateControllers/holdingsValueUpdateController');
const stockSearchController = require('../controllers/stockSearchControllers/stockSearchController');
const chartSearchController = require('../controllers/stockSearchControllers/chartSearchController');
const getUserHoldingsController = require('../controllers/portfolioControllers/getUserHoldingsController');
const getPortfolioTotalController = require('../controllers/portfolioControllers/getPortfolioTotalController');
const isAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/api/search/:symbol', isAuth, stockSearchController);

router.get('/api/search/chart/:symbol', isAuth, chartSearchController);

router.get('/api/portfolio/:userId', isAuth, getPortfolioTotalController);

router.get('/api/stocks/:userId', isAuth, getUserHoldingsController);

router.post('/api/stocks/new', isAuth, buyNewStockController);

router.put('/api/stocks/buy', isAuth, buyOldSharesController);

router.put('/api/stocks/sell', isAuth, sellSharesController);

router.put('/api/stocks/update', isAuth, holdingsValueUpdateController);

module.exports = router;