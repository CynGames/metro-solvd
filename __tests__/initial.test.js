const request = require('supertest');
const app = require('../app');

describe('Healthcheck for root "/api" endpoint', () => {
    it('should return a 200 status', async () => {
        const response = await request(app)
            .get('/api');
        expect(response.status)
            .toBe(200);
    });
});
