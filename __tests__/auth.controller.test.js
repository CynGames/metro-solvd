const request = require('supertest');
const app = require('../app');
const db = require('../metro_db/db');

describe('Auth Controller', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM system_user WHERE name = $1', ['test']);
    });

    afterAll(async () => {
        await db.query('DELETE FROM system_user WHERE name = $1', ['test']);
        await db.pool.end();
    });

    it('should fail to login a non-existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                name: 'test',
                password: 'test',
            });

        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual('User not found');
    });

    it('should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'test',
                password: 'test',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Registration Successful');
    });

    it('should fail to register an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'test',
            });

        expect(res.statusCode).toEqual(401);
        expect(res.text).toEqual('Must provide name and password');
    });

    it('should login a user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'test',
                password: 'test',
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                name: 'test',
                password: 'test',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.headers).toHaveProperty('authorization');
    });
});
