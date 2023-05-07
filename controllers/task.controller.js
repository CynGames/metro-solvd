const { Pool } = require('pg');
const { verifyJWT } = require('../utils/jwt.util');
const config = require('../config/config');
const { getTimePeriods, calculateTrainIntervals } = require('../utils/task.util');

const pool = new Pool(config);

module.exports = {
    get: async (req, res) => {
        try {
            // get the jwt from the header
            const token = req.headers.authorization.split(' ')[1];

            // verify the jwt
            const verified = verifyJWT(token, config.secret);

            // if the jwt is valid, return the homework
            if (!verified) {
                res.send('Unauthorized request, please login');
            }

            const timePeriods = await getTimePeriods(pool);
            const trainIntervals = calculateTrainIntervals(timePeriods);

            res.status(200).json(trainIntervals);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};
