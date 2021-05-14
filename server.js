const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const axios = require("axios");
require("dotenv").config();
const bodyParser = require('body-parser');
const pool = require('./client/src/pool');

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

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    if (username && password) { //using test db - change for production!
        const { rows } = await pool.query(`
            SELECT * FROM test_users
            WHERE username = $1;
        `, [username])
        if(rows[0].password === password){
            res.send(rows)
            console.log(rows);
            console.log(rows[0].password)
        } else {
            res.sendStatus(500);
            // res.send('Password incorrect')
            // console.log('Password incorrect')

        }

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



