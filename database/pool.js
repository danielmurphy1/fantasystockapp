// const pg = require('pg');

// class Pool {
//     _pool = null;

//     connect(options){
//         this._pool= new pg.Pool(options);
//         return this._pool.query('SELECT 1 + 1;'); //need query to get pool to connect to databse - creates a promise in server.js
//     }

//     close() {
//         return this._pool.end();
//     }
    
//     query(sql, params){
//         return this._pool.query(sql, params);
//     }
// }

// module.exports = new Pool();

const { Pool } = require('pg');
require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
