const request = require('supertest');
const app = require('../app');
const { generateJWT } = require('../utils/jwt.util');
const { secret } = require('../config/config');

const validToken = generateJWT({ alg: 'HS256', typ: 'JWT' }, { user: 'test' }, secret);
const invalidToken = 'invalid_token';

describe('Task Controller', () => {
    it('should fail to get task resolution with an invalid token', async () => {
        const res = await request(app)
            .get('/api/task')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(res.statusCode).toEqual(401);
        expect(res.text).toEqual('Unauthorized request, please login');
    });

    it('should get task resolution with a valid token', async () => {
        const res = await request(app)
            .get('/api/task')
            .set('Authorization', `Bearer ${validToken}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).toHaveProperty('Time Period');
        expect(res.body[0]).toHaveProperty('Time Interval Between Trains');
    }, 10000);
});
