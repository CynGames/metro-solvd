const { Router } = require('express');

const authRouter = require('./auth.routes');
const homeworkRouter = require('./homework.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/homework', homeworkRouter)

module.exports = router;