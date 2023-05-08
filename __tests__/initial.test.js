// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest'); // Adjust the path to point to your app file
const app = require('../app');

describe('GET /api', () => {
    it('should return a 200 status', async () => {
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
    });
});
