const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decodedToken;
    
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken){
        const error = new Error("Not Authorized");
        error.statusCode = 401;
        throw error;
    }

    next();
};