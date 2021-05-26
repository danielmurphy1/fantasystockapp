const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const axios = require("axios");
require("dotenv").config();
const bodyParser = require('body-parser');
const pool = require('./client/src/pool');
const jwt = require('jsonwebtoken');



app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use("/trade", express.static(path.join(__dirname, "client/build")));
app.use("/portfolio", express.static(path.join(__dirname, "client/build")));

const stocks = [];

app.get("/api/search/:symbol", (req, res) =>{
    const symbol = req.params.symbol;
    const token = process.env.TEST_TOKEN;
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${token}`)
        .then((response) => {
            res.send(response.data);
        console.log(response.data)

        })
        .catch(error => {
            console.log(error)
        })
});

app.post("/api/stocks", (req, res) =>{
    res.send(req.body);
    console.log(req.body);
    stocks.push(req.body);
    console.log(stocks);
});

app.get("/api/stocks", (req, res) =>{ //send client the stocks array
    res.send(stocks)
});

//testing for protected api endpoints
// app.get('/api/protected', (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];
//     // const token = req.headers.authorization;

//     // const token = req.query.token;

//     jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
//         if(!err){
//             const info ={"name":"Tommy", "home": "Pittsburgh"};
//             res.json(info);
//         } else {
//             res.send(err);
//         }
//     })
// })

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = { name: username}
    const accessToken = await jwt.sign(user, process.env.TOKEN_SECRET_KEY, {expiresIn: '3600000'});
    // res.json({ accessToken: accessToken})

    if (username && password) { //using test db - change for production!
        const { rows } = await pool.query(`
            SELECT * FROM test_users
            WHERE username = $1;
        `, [username])
        console.log(rows[0].password)
        console.log(password)

        if(rows[0].password === password){
            // res.send(accessToken)
            // console.log(rows + res.json({accessToken : accessToken}));
            // console.log(rows[0].password)
            res.send({accessToken: accessToken, expiresIn: '3600000', rows})
        } else {
            // res.send(error);

            // res.send('Username or Password Does Not Match', 404);
            res.send('Username or Password Does Not Match');
        }
    }
    
});

// app.post("/api/login", async (req, res) => {
//     const { username, password } = req.body;
//     // const user = { name: username}
//     let loadedUser;
//     // res.json({ accessToken: accessToken})

//     //using test db - change for production!
//     const { rows } = await pool.query(`
//         SELECT * FROM test_users
//         WHERE username = $1;
//     `, [username])
//         .then(username => {
//             if(!rows[0].username) {
//                 const error = new Error('Username does not exist.');
//                 error.statusCode = 401;
//                 throw error;
//             }
//             loadedUser = rows;
//         })
//         .then(password=> {
//             if(password != password) {
//                 const error = new Error('Wrong Password');
//                 error.message = 'Wrong Password Entered';
//                 error.statusCode = 401;
//                 throw error;
//             }
//             const accessToken =  jwt.sign({
//                 name: loadedUser.username, 
//                 id: loadedUser.id.toString()
//                 }, 
//                 process.env.TOKEN_SECRET_KEY, 
//                 {expiresIn: '1h'});
//             res.status(200).json({accessToken: accessToken, id: loadedUser.id.toString()})
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(401).json({message: err.message, statuscode: err.statusCode});
//         })
    
    
// });

// app.post('/api/token', async (req, res) => {
//     const username = req.body.username;
//     const user = { name: username };
//     const accessToken = await jwt.sign(user, process.env.TOKEN_SECRET_KEY, {expiresIn: '1h'});
//     res.json({ accessToken: accessToken})
// })

app.post("/api/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { rows } = await pool.query(`
            INSERT INTO test_users (username, password)
            VALUES
                ($1, $2)
                RETURNING *;
        `, [username, password])
            res.send(rows);
    } catch (error) {
        res.send(error)
    }
});

pool.connect({
    host: 'localhost', 
    port: 5432, 
    database: 'fantasy_stocks', 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port: ${port}.`);
        });
    })
    .catch(err => {
        console.error(err)
});



