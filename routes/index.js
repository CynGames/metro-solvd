const { Router } = require('express');

const authRouter = require('./auth.routes');
const taskRouter = require('./task.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/task', taskRouter);

module.exports = router;
