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
const stocksRouter = require('./client/src/utils/routes/stocks-routes');
const isAuth = require('./client/src/utils/middleware/authMiddleware');

app.use(express.json());
app.use(usersRouter);
app.use(stocksRouter);

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use("/trade", express.static(path.join(__dirname, "client/build")));
app.use("/portfolio", express.static(path.join(__dirname, "client/build")));

// app.get("/api/search/:symbol", isAuth, (req, res) =>{
//     const symbol = req.params.symbol;
//     const token = process.env.PRODUCTION_TOKEN;
//     axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`)
//         .then(response => {
//             res.send(response.data);
//         console.log(response.data)

//         })
//         .catch(error => {
//             console.log(error)
//         })
// });

// app.get("/api/search/chart/:symbol", isAuth, (req, res) =>{
//     const symbol = req.params.symbol;
//     const token = process.env.PRODUCTION_TOKEN;
//     axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1w?token=${token}`)
//         .then(response => {
//             res.send(response.data)
//         })
//         .catch(error => {
//             console.log(error)
//         })
// });

// app.get("/api/portfolio/:userId", isAuth, async (req, res) => {
//     const { userId } = req.params;
//     const { rows } = await pool.query(`
//     SELECT SUM (shares_value) as total
//     FROM test_user_stocks
//     WHERE user_id = $1;
//     `, [userId])
//     res.send(rows);
// })

app.post("/api/stocks/new", isAuth, async (req, res) =>{    
    try {
        const { userId, symbol, companyName, sharesToBuy, sharesValue } = req.body;
        const { rows } =  await pool.query(`
            INSERT INTO test_user_stocks (user_id, symbol, company_name, shares_owned, shares_value)
            VALUES
                ($1, $2, $3, $4, $5)
                RETURNING *;
        `, [userId, symbol, companyName, sharesToBuy, sharesValue])
    // .then(res => res.send(rows));
    res.send(rows);
    } catch (error) {
        error.statusCode = 500;
        res.send(error);
        throw error;
    }
});

// app.put('/api/user/transaction', async (req, res) => {
//     const { balance } = req.body;

//     const { rows } = await pool.query(`
//             UPDATE test_users
//             SET wallet_ballance = $1
//             WHERE id = 196
//             RETURNING *;
//         `, [balance])
//         res.send(rows)
// })

app.put("/api/stocks/buy", isAuth, async (req, res) => {
    try {
        const { newShares, userId, symbol, newValue } = req.body;
        const { rows } = await pool.query(`
        UPDATE test_user_stocks
        SET shares_owned = $1,
            shares_value = $2
        WHERE user_id = $3 AND symbol = $4
        RETURNING *; 
        `, [newShares, newValue, userId, symbol])
        res.send(rows);
    } catch (error) {
        error.statusCode = 500;
        res.send(error);
        throw error;
    }    
});

app.put("/api/stocks/sell", isAuth, async (req, res) => {
    try {
        const { newShares, userId, symbol, newValue } = req.body;
        if (newShares === 0){
            const { rows } = await pool.query(`
            DELETE from test_user_stocks
            WHERE symbol = $1
            RETURNING *;
            `, [symbol])
            res.send(rows);
        } else {
            const { rows } = await pool.query(`
            UPDATE test_user_stocks
            SET shares_owned = $1,
                shares_value = $2
            WHERE user_id = $3 AND symbol = $4
            RETURNING *; 
            `, [newShares, newValue, userId, symbol])
            res.send(rows);
        }
        
    } catch (error) {
        error.statusCode = 500;
        res.send(error);
        throw error;
    }    
});

app.put("/api/stocks/update", isAuth, async (req, res) => {
    try {
        const { userId, symbol, newValue } = req.body;
        const { rows } = await pool.query(`
        UPDATE test_user_stocks
        SET shares_value = $1
        WHERE user_id = $2 AND symbol = $3
        RETURNING *; 
        `, [newValue, userId, symbol])
        res.send(rows);
    } catch (error) {
        error.statusCode = 500;
        res.send(error);
        throw error;
    }    
});

// app.get("/api/stocks", isAuth, async (req, res) =>{ 
//     // res.send(stocks)
//     const { userId } = req.body;
//     const { rows } = await pool.query(`
//         SELECT * FROM test_user_stocks
//         WHERE user_id = $1;
//     `, [userId])
//     res.send(rows);
// });

app.get("/api/stocks/:userId", isAuth, async (req, res) =>{ 
    // res.send(stocks)
    const { userId } = req.params;
    const { rows } = await pool.query(`
        SELECT * FROM test_user_stocks
        WHERE user_id = $1;
    `, [userId])
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



