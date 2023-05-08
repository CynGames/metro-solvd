const config = require('../config/config');

const { generateJWT } = require('../utils/jwt.util');
const { employeeService } = require('../services');

module.exports = {
    // eslint-disable-next-line consistent-return
    login: async (req, res, next) => {
        try {
            // Temporary implementation of a login endpoint using an in-memory array
            const findUser = await employeeService.find(req);

            if (!findUser) {
                return res.send('User not found');
            }

            // Hardcoded credentials for demo purposes
            const header = { alg: 'HS256', typ: 'JWT' };
            const payload = { name: req.body.name, password: req.body.password };

            const token = generateJWT(header, payload, config.secret);

            // set the token request header
            res.set('Authorization', `Bearer ${token}`);

            return res.send(JSON.stringify({
                message: 'Login Successful. Set the in the header the following [Authorization: Bearer <token>] and then try to access the homework through the /homework endpoint now please.',
                token,
            }));
        } catch (error) {
            return next(error);
        }
    },
    register: async (req, res, next) => {
        try {
            // Temporary implementation of a register endpoint using an in-memory array
            const operationState = employeeService.create(req);

            if (!operationState) {
                return res.send('Registration Failed');
            }

            return res.send('Registration Successful');
        } catch (error) {
            return next(error);
        }
    },
};
