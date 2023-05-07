// employeeController.js
const db = require('../database/db');

module.exports = {
    // eslint-disable-next-line consistent-return
    createEmployee: async (req, res) => {
        try {
            const { name, job_role: jobRole } = req.body;

            if (!name || !jobRole) {
                return res.status(400).json({ error: 'Missing required fields: name and job_role.' });
            }

            const result = await db.query(
                'INSERT INTO Employee (name, job_role) VALUES ($1, $2) RETURNING id, name, job_role',
                [name, jobRole],
            );

            const newEmployee = result.rows[0];
            res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
        } catch (error) {
            console.error('Error creating employee:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};
