const updateValues = require('../../services/updateServices/holdingsValueUpdateService');

module.exports = async (req, res) => {
    try {
        const { userId, symbol, newValue } = req.body;
        const updatedValues = await updateValues(newValue, userId, symbol);
        res.send(updatedValues);
    } catch (error) {
        res.send(error);
    }
};