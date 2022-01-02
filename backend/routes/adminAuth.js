const express = require('express');
const router = express.Router();

const { adminId } = require('../controller/admin');
const { signin, signup, isOwner } = require('../controller/adminAuth');

router.post('/admin/signin',signin);

// owner role 2
router.post('/create/admin/:adminId',isOwner,signup);
router.param("adminId", adminId);

module.exports = router;

