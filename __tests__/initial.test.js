const request = require('supertest');
const app = require('../app');
const { port } = require('../config/config');

describe('Healthcheck for root "/api" endpoint', () => {
    let server;

    beforeAll(() => {
        server = app.listen(port);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return a 200 status', async () => {
        const response = await request(app)
            .get('/api');
        expect(response.status)
            .toBe(200);
    });
});
