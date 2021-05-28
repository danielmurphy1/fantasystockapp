const pool = require('../../pool');
const jwt = require('jsonwebtoken');


class UserController { //database name will need to be changed for production - curently using 'test_NAMEOFTABLE'

    static async findByUsername(username) {
        const {rows} = await pool.query(`
            SELECT * FROM test_users
            WHERE username = $1;
        `, [username]);

        return rows;
    };

    static async signup(username, password) {
        const { rows } = await pool.query(`
            INSERT INTO test_users (username, password)
            VALUES
                ($1, $2)
                RETURNING *;
        `, [username, password])

        return rows;
    };

    static async login(username, password, res){
        const user = {name: username};
        const loggedUser = await pool.query(`
            SELECT * FROM test_users
            WHERE username = $1;
        `, [username])
        .then(result => {
            if(result.rows.length < 1){
                console.log(result.rows.length)
                const error = new Error ('Username does not exist.');
                error.statusCode = 404;
                throw error;
            } else {
                if (result.rows[0].password === password) {
                console.log(result.rows)
                const accessToken = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {expiresIn: '3600000'});
                
                res.send({accessToken: accessToken, expiresIn: '3600000', result: result.rows});
                } else if (result.rows[0].password != password){
                const error = new Error ('Incorrect Password.');
                error.statusCode = 401;
                throw error;
                }
            }
        })
        .catch(error => {
            console.log(error);
            res.status(error.statusCode).send({message: error.message, statusCode: error.statusCode});
        })
        return loggedUser; 
    };
        
};

module.exports = UserController;