const express = require('express');
const router = express.Router();

const { signin } = require('../controller/adminAuth');

router.post('/admin/signin',signin);

module.exports = router;