const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/:resource', controller.getOriginalRoute);
router.get('/', controller.getOriginalRoute);
router.delete('/cache', controller.clearCache);

module.exports = router;