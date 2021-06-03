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

app.post("/api/stocks", async (req, res) =>{    
    try {
        const { userId, symbol, companyName, sharesOwned, sharesValue } = req.body;
        const { rows } =  await pool.query(`
            INSERT INTO test_user_stocks (user_id, symbol, company_name, shares_owned, shares_value)
            VALUES
                ($1, $2, $3, $4, $5)
                RETURNING *;
        `, [userId, symbol, companyName, sharesOwned, sharesValue])
    // .then(res => res.send(rows));
    res.send(rows);
    } catch (error) {
        error.statusCode = 500;
        res.send(error);
        throw error;
    }
});

app.get("/api/stocks", isAuth, async (req, res) =>{ //send client the stocks array
    // res.send(stocks)
    const { rows } = await pool.query(`
        SELECT * FROM test_user_stocks;
    `)
    res.send(rows);
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



