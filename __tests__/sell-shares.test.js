const sellSharesController = require('../controllers/transactionControllers/sellSharesController');
const sellStockService = require('../services/transactionServices/sellingService');
const walletUpdateController = require('../controllers/updateControllers/walletUpdateController');
const walletUpdateService = require('../services/updateServices/walletUpdateService');

jest.mock('../services/transactionServices/sellingService');
jest.mock('../services/updateServices/walletUpdateService');

describe('Selling Shares', () => {
    describe('Selling less than all shares of a stock', () => {
        test('should call the sellStockService through the sellSharesController while updating the number of shares and shares value.', async () => {
            
            const userId = 'testUser';
            const symbol = 'TSTNG';
            const oldShares = 15;
            const sharesToSell = 10;
            const newShares = oldShares - sharesToSell;
            const oldSharesValue = 100;
            const newValue = newShares * oldSharesValue;

            const req = {
                body: {
                    userId, 
                    symbol, 
                    newValue,
                    newShares
                }
            };
            const res = {};
            res.send = jest.fn();

            await sellSharesController(req, res);
            expect(sellStockService).toHaveBeenCalledWith(newShares, userId, symbol, newValue);
            expect(sellStockService).toHaveBeenCalledTimes(1);
        });

        test('should call the walletUpdateService through the walletUpdateController and update the user wallet.', async () => {

            const oldBalance = 1000;
            const sharesValue = 100;
            const user = '100';
            const balance = oldBalance + sharesValue;

            const req ={
                body: {
                    balance, 
                    user
                }
            };

            const res = {};
            res.send = jest.fn();

            await walletUpdateController(req, res);
            expect(walletUpdateService).toHaveBeenCalledWith(balance, user);
            expect(walletUpdateService).toHaveBeenCalledTimes(1);
        });
    });

    describe('Selling all shares of a stock', () => {
        test('should call the sellStockService through the sellSharesController while deleting the record of the stock.', async () => {
            const userId = 'testUser';
            const symbol = 'TSTNG';
            const oldShares = 15;
            const sharesToSell = 15;
            const newShares = oldShares - sharesToSell;
            const oldSharesValue = 100;
            const newValue = newShares * oldSharesValue;


            const req = {
                body: {
                    userId, 
                    symbol, 
                    newValue,
                    newShares
                }
            };
            const res = {};
            res.send = jest.fn();

            await sellSharesController(req, res);
            expect(sellStockService).toHaveBeenCalledWith(newShares, userId, symbol, newValue);
            expect(sellStockService).toHaveBeenCalledTimes(2);
        });

        test('should call the walletUpdateService through the walletUpdateController update the user wallet.', async () => {

            const oldBalance = 1000;
            const sharesValue = 100;
            const user = '100';
            const balance = oldBalance + sharesValue;

            const req ={
                body: {
                    balance, 
                    user
                }
            };

            const res = {};
            res.send = jest.fn();
            
            const result = await walletUpdateController(req, res);
            expect(walletUpdateService).toHaveBeenCalledWith(balance, user);
            expect(walletUpdateService).toHaveBeenCalledTimes(2);
        });
    });
});