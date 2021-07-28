const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
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

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use("/trade", express.static(path.join(__dirname, "client/build")));
app.use("/portfolio", express.static(path.join(__dirname, "client/build")));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
});

// pool.connect({ //local
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

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://clrciyosaombqh:c34b8316be6960a5aa2e8551b0bb0c9545c4384f361f15736bddca1135706e96@ec2-52-1-20-236.compute-1.amazonaws.com:5432/dd79dt65n3e6fa',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT 1+1;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

app.listen(port, () =>{
  console.log(`listening on port ${port}`);
});