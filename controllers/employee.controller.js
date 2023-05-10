// employeeController.js
const db = require('../metro_db/db');

module.exports = {
    getAllEmployees: async (req, res) => {
        try {
            const result = await db.query('SELECT id, name, job_role FROM Employee');
            const employees = result.rows;
            return res.status(200).json({ message: 'Employees fetched successfully', employees });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error fetching employees:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    getEmployeeById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Missing required field: id.' });
            }

            const result = await db.query('SELECT id, name, job_role FROM Employee WHERE id = $1', [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            const employee = result.rows[0];
            return res.status(200).json({ message: 'Employee fetched successfully', employee });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error fetching employee:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
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
            return res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error creating employee:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
