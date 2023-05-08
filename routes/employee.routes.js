const { Router } = require('express');
const { employeeController } = require('../controllers');

const router = Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);

module.exports = router;
