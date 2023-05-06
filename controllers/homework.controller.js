const {verifyJWT} = require("../utils/jwt.util");
const config = require('../config/config');

module.exports = {
    get: (req, res) => {

        // get the jwt from the header
        const token = req.headers.authorization.split(' ')[1];

        // verify the jwt
        const verified = verifyJWT(token, config.secret);

        // if the jwt is valid, return the homework
        if(!verified) {
            res.send('Unauthorized request, please login');
        }

        res.send('What is the interval between trains at one time or another, if 6 cars and each accommodates 50 people, and the flow of people in the morning is 1000 people, at lunch 500, and in the evening 5000')
    }
}