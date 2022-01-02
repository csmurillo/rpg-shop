const express = require('express');
const router = express.Router();
const { userId, addToOrderHistory }=require('../controller/user');
const {createOrder, orderList} = require('../controller/order');

const verifyToken = require('../middleware/verifyToken');
const { isAuth } = require('../controller/userAuth');

const { adminId } = require('../controller/admin');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const { isAdminAuth } = require('../controller/adminAuth');

router.post('/order/create/:userId',verifyAdminToken,isAuth,addToOrderHistory,createOrder);

// admin view orders route
router.get('/orders/:adminId',verifyAdminToken,isAdminAuth,orderList);

router.param("userId", userId);
router.param("adminId", adminId);

module.exports=router;