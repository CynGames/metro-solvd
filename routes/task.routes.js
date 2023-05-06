const { Router } = require('express');
const { taskController } = require('../controllers');

const router = Router();

router.get('/', taskController.get);

module.exports = router;