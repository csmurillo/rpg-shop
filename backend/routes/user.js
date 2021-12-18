const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const { isAuth } = require('../controller/auth');
const { accountInformation, updateAccountInformation, userId, updatePassword } = require('../controller/user');

router.get('/user/account/:userId', verifyToken, isAuth, accountInformation);
router.put('/user/account/update/:userId',verifyToken, isAuth, updateAccountInformation);
router.put('/user/account/updatePassword/:userId',verifyToken, isAuth, updatePassword);

router.param("userId", userId);

module.exports = router;