// db.js
const { Pool } = require('pg');
const config = require('../config/config');

// const pool = new Pool({
//     user: '',
//     host: '',
//     database: '',
//     password: '',
//     port: 5432,
// });

const pool = new Pool(config);

module.exports = {
    query: (text, params) => pool.query(text, params),
};
