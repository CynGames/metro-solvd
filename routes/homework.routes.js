const { Router } = require('express');
const { homeworkController } = require('../controllers');

const router = Router();

router.get('/', homeworkController.get);

module.exports = router;
