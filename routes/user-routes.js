const express = require('express');
const loginUserController = require('../controllers/loginUserController');
const signupController = require('../controllers/signupController');
const walletUpdateController = require('../controllers/updateControllers/walletUpdateController');

const router = express.Router();

router.post('/api/signup', signupController);

router.post('/api/login', loginUserController);

router.put('/api/user/wallet-update', walletUpdateController);

module.exports = router;