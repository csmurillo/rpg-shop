const express = require('express');
const router = express.Router();

const { accountInformation, orderhistory } = require('../controller/user');

router.get('user/account', accountInformation);

router.get('user/account/orderhistory', orderhistory);

module.exports = router;
