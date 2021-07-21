const pool = require('../../database/pool');
const jwt = require('jsonwebtoken');



async function login(username, password) {
    const user = {name: username};
    const result = await pool.query(`
        SELECT * FROM test_users
        WHERE username = $1;
    `, [username])

    if(result.rows.length < 1){
        const error = new Error ('Username does not exist.');
        error.statusCode = 404;
        throw error;
    } else { 
        if (result.rows[0].password === password) {
        const accessToken = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {expiresIn: '3600000'});
        
        return {accessToken: accessToken, expiresIn: '3600000', result: result.rows};
        } else {
        const error = new Error ('Incorrect Password.');
        error.statusCode = 401;
        throw error;
        }
    }   
};


module.exports = login;