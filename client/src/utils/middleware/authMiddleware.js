const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    // const token = req.headers.authorization;

    // const token = req.query.token;

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
        if(!err){
            const info ={"name":"Tommy", "home": "Pittsburgh"};
            res.json(info);
        } else {
            res.send(err);
        }
    })
    next();
};