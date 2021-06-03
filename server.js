const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const axios = require("axios");
require("dotenv").config();
const bodyParser = require('body-parser');
const pool = require('./client/src/pool');
const jwt = require('jsonwebtoken');
const usersRouter = require('./client/src/utils/routes/user-routes');
const isAuth = require('./client/src/utils/middleware/authMiddleware');

app.use(express.json());
app.use(usersRouter);

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

app.get("/api/stocks", isAuth, (req, res) =>{ //send client the stocks array
    res.send(stocks)
});

// testing for protected api endpoints
app.get('/api/protected', isAuth, (req, res) => {
    // const token = req.headers.authorization.split(' ')[1];
    // const token = req.headers.authorization;

    // const token = req.query.token;

    // jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
    //     if(!err){
    //         const info ={"name":"Tommy", "home": "Pittsburgh"};
    //         res.json(info);
    //     } else {
    //         res.send(err);
    //     }
    // })

    const info ={"name":"Tommy", "home": "Pittsburgh", "address": "123 Main St"};

    res.json(info);
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
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



