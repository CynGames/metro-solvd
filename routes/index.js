const { Router } = require('express');

const authRouter = require('./auth.routes');
const taskRouter = require('./task.routes');

const router = Router();

function index(req, res) {
    res.json({
        message: 'Welcome to the API',
    });
}

router.get('/', index);

router.use('/auth', authRouter);
router.use('/task', taskRouter);

module.exports = router;
