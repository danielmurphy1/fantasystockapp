const signup = require('../services/signupService');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await signup(username, password);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
};