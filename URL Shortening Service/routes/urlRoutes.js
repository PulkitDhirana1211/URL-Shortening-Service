const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();


router.route('/')
    .post(urlController.createShortURL)

router.route('/:shortCode')
    .get(urlController.getOriginalUrl)
    .patch(urlController.updateURL)
    .delete(urlController.deleteShortURL)

router.route('/:shortCode/stats')
    .get(urlController.getStats)

module.exports = router