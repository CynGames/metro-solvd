const { Router } = require('express');
const { taskController } = require('../controllers');

const router = Router();

router.get('/', taskController.getTaskResolution);

module.exports = router;
