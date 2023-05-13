require('dotenv').config();
const url = require('url');

let config;
if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: {
            rejectUnauthorized: false,
        },
    };
} else {
    config = {
        secret: process.env.SECRET,
        port: +process.env.PORT,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    };
}

module.exports = config;
