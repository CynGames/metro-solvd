const request = require('supertest');
const app = require('../app');
const db = require('../metro_db/db');

describe('Employee Controller', () => {
    let employeeId;

    beforeEach(async () => {
        await db.query('DELETE FROM Employee WHERE name = $1', ['test']);

        const result = await db.query(
            'INSERT INTO Employee (name, job_role) VALUES ($1, $2) RETURNING id',
            ['test', 'test role'],
        );

        employeeId = result.rows[0].id;
    }, 10000);

    afterAll(async () => {
        await db.query('DELETE FROM Employee WHERE name = $1', ['test']);
        await db.pool.end();
    });

    it('should get all employees', async () => {
        const res = await request(app)
            .get('/api/employees');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('employees');
    });

    it('should not get an employee with invalid id', async () => {
        const res = await request(app)
            .get('/api/employees/99999');

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Employee not found');
    });

    it('should get an employee by id', async () => {
        const res = await request(app)
            .get(`/api/employees/${employeeId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('employee');
    });

    it('should fail to create an employee without required fields', async () => {
        const res = await request(app)
            .post('/api/employees')
            .send({
                name: 'test',
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Missing required fields: name and job_role.');
    });

    it('should create an employee', async () => {
        const res = await request(app)
            .post('/api/employees')
            .send({
                name: 'test2',
                job_role: 'test role2',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('employee');

        await db.query('DELETE FROM Employee WHERE name = $1', ['test2']);
    });

    it('should fail to update an employee with invalid id', async () => {
        const res = await request(app)
            .put('/api/employees/9999')
            .send({
                name: 'test2',
                job_role: 'test role2',
            });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Employee not found');
    });

    it('should update an employee', async () => {
        const res = await request(app)
            .put(`/api/employees/${employeeId}`)
            .send({
                name: 'test2',
                job_role: 'test role2',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('employee');
        expect(res.body.employee.name).toEqual('test2');
        expect(res.body.employee.job_role).toEqual('test role2');
    });

    it('should fail to delete an employee with invalid id', async () => {
        const res = await request(app)
            .delete('/api/employees/9999');

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Employee not found');
    });

    it('should delete an employee', async () => {
        const res = await request(app)
            .delete(`/api/employees/${employeeId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Employee deleted successfully');
    });
});
