const express = require('express');
const UserController = require('../controllers/user-controller');

const router = express.Router();

router.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserController.signup(username, password);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // const user = { name: username };
        const loggedUser = await UserController.login(username, password, res);
        res.send(loggedUser)
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;