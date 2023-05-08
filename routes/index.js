const { Router } = require('express');

const authRouter = require('./auth.routes');
const taskRouter = require('./task.routes');
const employeeRouter = require('./employee.routes');

const router = Router();

function index(req, res) {
    res.json({
        message: 'Welcome to the Solvd Metro API',
    });
}

router.get('/', index);

router.use('/auth', authRouter);
router.use('/task', taskRouter);
router.use('/employees', employeeRouter);

module.exports = router;
