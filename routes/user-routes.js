const express = require('express');
const UserController = require('../controllers/user-controller');
const loginUserController = require('../controllers/loginUserController');
const signupController = require('../controllers/signupController');

const router = express.Router();

router.post('/api/signup', signupController);

router.post('/api/login', loginUserController);

router.put('/api/user/transaction', async (req, res) =>{
    try {
        const { balance, user } = req.body;
        const wallet = await UserController.trade(balance, user)
        res.send(wallet);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;