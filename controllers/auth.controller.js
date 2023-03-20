const {generateJWT, verifyJWT, decodeJWT} = require("../utils/jwt.util");

module.exports = {
    login: (req, res) => {

        /*
        *   This is a demo of my JWT implementation
        *   The actual login process will be implemented later
        */


        // Hardcoded credentials for demo purposes
        const header = {alg: 'HS256', typ: 'JWT'};
        const payload = {id: 1, name: 'Mikhail Tamashuk', role: 'Train Operator', assigned_to: 2};
        const secret = 'Solvd';

        const token = generateJWT(header, payload, secret);

        if(!verifyJWT(token, secret)) {
            res.status(401).send("Invalid token");
        }

        const decodedToken = decodeJWT(token);

        const response = {
            message: `Login successful, welcome Mr. ${decodedToken.payload.name}`,
            token
        }

        res.send(JSON.stringify(response));
    }
}

