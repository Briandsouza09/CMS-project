const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');

router.post('/register', licenseController.registerLicense);
router.get('/check', licenseController.checkLicense);
router.get('/data', licenseController.getLicenseData);

module.exports = router;