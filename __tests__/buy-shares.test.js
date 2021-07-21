
const StocksController = require('../controllers/stocks-controller');
const UserController = require('../controllers/user-controller');

jest.mock('../utils/controllers/user-controller');
jest.mock('../utils/controllers/stocks-controller');

describe('Buying Shares', () => {
    describe('Buying a New Stock', () => {
        test('should add new stock symbol, company name, shares owned, and shares value to DB ', async () => {
        
            const userId = 'testUser';
            const symbol = 'TSTNG';
            const companyName = 'TESTING';
            const sharesToBuy = 10;
            const sharesValue = 100;
            
            // StocksController.buyNewStock = jest.fn();
            StocksController.buyNewStock.mockReturnValue([userId, symbol, companyName, sharesToBuy, sharesValue]);

            const result = await StocksController.buyNewStock(userId, symbol, companyName, sharesToBuy, sharesValue);
            expect(result).toEqual([userId, symbol, companyName, sharesToBuy, sharesValue]);

        });

        test('should subtract shares value from user wallet balance', async () => {
            
            const oldBalance = 1000;
            const sharesValue = 100;
            const id = '100';
            const newBalance = oldBalance - sharesValue;

            UserController.trade = jest.fn();
            UserController.trade.mockReturnValue([newBalance, id]);

            const result = UserController.trade(newBalance, id);
            expect(result).toEqual([newBalance, id]);
        });
    });

    describe('Buying more shares of a stock already owned', () => {
        test('should add the new shares to the current and update the new total shares value to the DB for the correct stock', async () => {

            const userId = 'testUser';
            const oldShares = 15;
            const purchaseShares = 10;
            const newShares = oldShares + purchaseShares;
            const symbol = 'TSTNG';
            const oldSharesValue = 100;
            const newValue = newShares * oldSharesValue;

            StocksController.buyShares = jest.fn();
            StocksController.buyShares.mockReturnValue([newShares, symbol, userId, newValue]);

            const result = StocksController.buyShares(newShares, symbol, userId, newValue);
            expect(result).toEqual([newShares, symbol, userId, newValue])
        });

        test('should subtract shares value from user wallet balance', async () => {
            
            const oldBalance = 1000;
            const sharesValue = 100;
            const id = '100';
            const newBalance = oldBalance - sharesValue;

            UserController.trade = jest.fn();
            UserController.trade.mockReturnValue([newBalance, id]);

            const result = UserController.trade(newBalance, id);
            expect(result).toEqual([newBalance, id]);
        });
    });
});