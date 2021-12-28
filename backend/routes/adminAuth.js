const express = require('express');
const router = express.Router();

const { signup, signin, deleteAccount } = require('../controller/adminAuth');

router.post('/signup',signup);
router.post('/signin',signin);
router.delete('/delete/account',deleteAccount);

module.exports = router;