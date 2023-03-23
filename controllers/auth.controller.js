const {generateJWT} = require("../utils/jwt.util");
const config = require('../config/config');

module.exports = {
    login: (req, res) => {

        // Hardcoded credentials for demo purposes
        const header = {alg: 'HS256', typ: 'JWT'};
        const payload = {id: 1, name: 'Mikhail Tamashuk', role: 'Train Operator', assigned_to: 2};

        const token = generateJWT(header, payload, config.secret);

        // set the token request header
        res.set('Authorization', `Bearer ${token}`);

        res.send(JSON.stringify({
            message: 'Login Successful. Set the in the header the following [Authorization: Bearer <token>] and then try to access the homework through the /homework endpoint now please.',
            token
        }));
    }
}

