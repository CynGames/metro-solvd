const request = require('supertest');
const app = require('../app'); // Your express app

describe('Auth Controller', () => {
    it('should login a user', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                name: 'test',
                password: 'test',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should register a user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: 'test',
                password: 'test',
            });

        expect(res.statusCode).toEqual(200);
    });
});
