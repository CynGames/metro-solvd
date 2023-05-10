const request = require('supertest');
const app = require('../app'); // Your express app

describe('Employee Controller', () => {
    it('should get all employees', async () => {
        const res = await request(app)
            .get('/employees');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('employees');
    });

    it('should get an employee by id', async () => {
        const res = await request(app)
            .get('/employees/1'); // assuming an employee with id 1 exists

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('employee');
    });

    it('should create an employee', async () => {
        const res = await request(app)
            .post('/employees')
            .send({
                name: 'test',
                job_role: 'test role',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('employee');
    });
});
