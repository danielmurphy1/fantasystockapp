const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser');
const pool = require('./database/pool');
const usersRouter = require('./routes/user-routes');
const stocksRouter = require('./routes/stocks-routes');

app.use(express.json());
app.use(usersRouter);
app.use(stocksRouter);

app.use(bodyParser.json());
// app.use("/", express.static(path.join(__dirname, "client/build")));
// app.use("/trade", express.static(path.join(__dirname, "client/build")));
// app.use("/portfolio", express.static(path.join(__dirname, "client/build")));

//production
app.use(express.static("client/build"));
/* package.json script for development - "client": "npm run watch --prefix client"
   package.json scropt for  production - "client": "npm start --prefix client"*/

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});

//for local DB

// pool.connect({ 
//     host: 'localhost', 
//     port: 5432, 
//     database: 'fantasy_stock_app', 
//     user: process.env.DB_USER, 
//     password: process.env.DB_PASSWORD
//     })
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Listening on port: ${port}.`);
//         });
//     })
//     .catch(err => {
//         console.error(err)
// });

//for deployed/production DB

pool.connect();

app.listen(port, () =>{
  console.log(`listening on port ${port}`);
});