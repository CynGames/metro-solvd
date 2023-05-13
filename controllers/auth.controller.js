const config = require('../config/config');

const { generateJWT } = require('../utils/jwt.util');
const db = require('../metro_db/db');

module.exports = {
    login: async (req, res, next) => {
        try {
            // Extract the name and password inserted by the user
            const { name, password } = req.body;

            // Query the database
            const { rows } = await db.query('SELECT id, name, password FROM system_user WHERE name = $1 AND password = $2', [name, password]);

            if (rows.length === 0) {
                return res.status(404).send('User not found');
            }

            const user = rows[0];
            const header = { alg: 'HS256', typ: 'JWT' };
            const payload = { id: user.id, name: user.name };

            const token = generateJWT(header, payload, config.secret);

            // set the token request header
            res.set('Authorization', `Bearer ${token}`);

            return res.send(JSON.stringify({
                message: 'Login Successful. With this token you are now cleared to view, add, edit or delete employees.',
                token,
            }));
        } catch (error) {
            return next(error);
        }
    },
    register: async (req, res, next) => {
        try {
            // Extract the name and password inserted by the user
            const { name, password } = req.body;

            if (!name || !password) {
                return res.status(401).send('Must provide name and password');
            }

            // Query the database
            const { rows } = await db.query('INSERT INTO system_user (name, password) VALUES ($1, $2) RETURNING id', [name, password]);

            if (rows.length === 0) {
                return res.status(404).send('User not found');
            }

            return res.send('Registration Successful');
        } catch (error) {
            return next(error);
        }
    },
};
