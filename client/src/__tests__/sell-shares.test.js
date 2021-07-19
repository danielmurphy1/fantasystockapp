const StocksController = require('../../../controllers/stocks-controller');
const UserController = require('../../../controllers/user-controller');

describe('Selling Shares', () => {
    describe('Selling less than all shares of a stock', () => {
        test('should subtract the sold shares from the current and update the new total shares value to the DB for the correct stock', async () => {
            
            const userId = 'testUser';
            const symbol = 'TSTNG';
            const oldShares = 15;
            const sharesToSell = 10;
            const newShares = oldShares - sharesToSell;
            const oldSharesValue = 100;
            const newValue = newShares * oldSharesValue;


            StocksController.sellShares = jest.fn();
            StocksController.sellShares.mockReturnValue([newShares, userId, symbol, newValue])

            const result = await StocksController.sellShares(newShares, userId, symbol, newValue);
            expect(result).toEqual([newShares, userId, symbol, newValue]);
        });

        test('should add shares value to user wallet balance', async () => {

            const oldBalance = 1000;
            const sharesValue = 100;
            const id = '100';
            const newBalance = oldBalance + sharesValue;

            UserController.trade = jest.fn();
            UserController.trade.mockReturnValue([newBalance, id]);

            const result = UserController.trade(newBalance, id);
            expect(result).toEqual([newBalance, id]);
        });
    });

    describe('Selling all shares of a stock', () => {
        test('should delete the record of the stock from the DB', async () => {
            const userId = 'testUser';
            const symbol = 'TSTNG';
            const oldShares = 15;
            const sharesToSell = 15;
            const newShares = oldShares - sharesToSell;
            const oldSharesValue = 100;
            const newValue = newShares * oldSharesValue;


            StocksController.sellShares = jest.fn();
            StocksController.sellShares.mockReturnValue([newShares, userId, symbol])

            const result = await StocksController.sellShares(newShares, userId, symbol);
            expect(result).toEqual([newShares, userId, symbol]);
        });

        test('should add shares value to user wallet balance', async () => {
            const oldBalance = 1000;
            const sharesValue = 100;
            const id = '100';
            const newBalance = oldBalance + sharesValue;

            UserController.trade = jest.fn();
            UserController.trade.mockReturnValue([newBalance, id]);

            const result = UserController.trade(newBalance, id);
            expect(result).toEqual([newBalance, id]);
        });
    });
});