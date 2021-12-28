const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const { isAuth } = require('../controller/userAuth');
const {product,products,createProduct,updateProduct,deleteProduct, productId}= require('../controller/product');
const {userId}=require('../controller/user');

router.get('/product/:productId',product);
router.get('/products',products);

// admin only
router.post('/product/create/:userId',createProduct);
router.put('/product/update/:productId/:userId',updateProduct);
router.delete('/product/delete/:productId/:userId',deleteProduct);

router.param("userId", userId);
router.param("productId", productId);

module.exports = router;
