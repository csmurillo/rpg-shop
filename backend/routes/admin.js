const express = require('express');
const router = express.Router();

const verifyAdminToken = require('../middleware/verifyAdminToken');
const { isAdminAuth } = require('../controller/adminAuth');
const { adminId, adminInformation } = require('../controller/admin');

router.get('/admin/account/:adminId', verifyAdminToken, isAdminAuth, adminInformation);

router.param("adminId", adminId);

module.exports = router;


