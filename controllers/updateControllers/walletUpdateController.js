const walletUpdate = require('../../services/updateServices/walletUpdateService');

module.exports = async (req, res) =>{
    try {
        const { balance, user } = req.body;
        const wallet = await walletUpdate(balance, user)
        res.send(wallet);
    } catch (error) {
        res.send(error);
    }
};