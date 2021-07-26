
const {buyOldSharesController, buyNewStockController} = require('../controllers/transactionControllers/buySharesController');
const { buyShares, buyNewStock } = require('../services/transactionServices/buyingService');
const walletUpdateController = require('../controllers/updateControllers/walletUpdateController');
const walletUpdateService = require('../services/updateServices/walletUpdateService');

jest.mock('../services/transactionServices/buyingService');
jest.mock('../services/updateServices/walletUpdateService');

describe('Buying Shares', () => {
    describe('Buying a New Stock', () => {
        test('should call the buyNewStock service through the buyNewStockController while adding the new stock record ', async () => {
        
            const userId = 'testUser';
            const symbol = 'TSTNG';
            const companyName = 'TESTING';
            const sharesToBuy = 10;
            const sharesValue = 100;

            req = {
                body: {
                    userId, 
                    symbol, 
                    companyName, 
                    sharesToBuy, 
                    sharesValue
                }
            };
            
            const res= {};
            res.send = jest.fn();
        

            await buyNewStockController(req, res);
            expect(buyNewStock).toHaveBeenCalledWith(userId, symbol, companyName, sharesToBuy, sharesValue);
            expect(buyNewStock).toHaveBeenCalledTimes(1);

        });

        test('should call the walletUpdateService through the walletUpdateController and update the user wallet.', async () => {
            
            const oldBalance = 1000;
            const sharesValue = 100;
            const user = '100';
            const balance = oldBalance - sharesValue;

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

    describe('Buying more shares of a stock already owned', () => {
        test('should call the buyShares service through the buyOldSharesController while updating the number and value of shares ', async () => {

            const userId = 'testUser';
            const oldShares = 15;
            const purchaseShares = 10;
            const newShares = oldShares + purchaseShares;
            const symbol = 'TSTNG';
            const oldSharesValue = 100;
            const newValue = newShares * oldSharesValue;

            req = {
                body: {
                    newShares, 
                    userId, 
                    symbol, 
                    newValue
                }
            };

            const res= {};
            res.send = jest.fn();
        

            await buyOldSharesController(req, res);
            expect(buyShares).toHaveBeenCalledWith(newShares, userId, symbol, newValue);
            expect(buyShares).toHaveBeenCalledTimes(1);
        });

        test('should call the walletUpdateService through the walletUpdateController and update the user wallet.', async () => {
            
            const oldBalance = 1000;
            const sharesValue = 100;
            const user = '100';
            const balance = oldBalance - sharesValue;

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
            expect(walletUpdateService).toHaveBeenCalledTimes(2);
        });
    });
});