const request = require('supertest');
const app = require('../app'); // Your express app

describe('Task Controller', () => {
    it('should get task resolution', async () => {
        const res = await request(app)
            .get('/task-resolution')
            .set('Authorization', 'Bearer <valid token>'); // replace <valid token> with an actual valid JWT token

        expect(res.statusCode).toEqual(200);
    });
});
