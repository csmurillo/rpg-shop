const express = require('express');
const router = express.Router();

const { userId }=require('../controller/user');
const verifyToken = require('../middleware/verifyToken');
const { isAuth } = require('../controller/userAuth');

const { adminId } = require('../controller/admin');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const { isAdminAuth, privledgedAdmin } = require('../controller/adminAuth');

const { product, products, createProduct, updateProduct, deleteProduct, productId }= require('../controller/product');

router.get('/product/:productId',product);
router.get('/products',products);

// admin only
router.post('/product/create/:adminId', verifyAdminToken, isAdminAuth, privledgedAdmin, createProduct);
router.put('/product/update/:productId/:adminId', verifyAdminToken, isAdminAuth, privledgedAdmin, updateProduct);
router.delete('/product/delete/:productId/:adminId', verifyAdminToken, isAdminAuth, privledgedAdmin, deleteProduct);


router.param("adminId", adminId);
router.param("userId", userId);
router.param("productId", productId);

module.exports = router;