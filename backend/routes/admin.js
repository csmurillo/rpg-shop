const express = require('express');
const router = express.Router();

const verifyAdminToken = require('../middleware/verifyAdminToken');
const { isAdminAuth } = require('../controller/adminAuth');
const { adminInformation } = require('../controller/admin');

router.get('/admin/account/:userId', verifyAdminToken, isAdminAuth, adminInformation);

router.param("userId", userId);

module.exports = router;


