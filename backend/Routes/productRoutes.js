const express=require('express');
const {isLogin, authorize}= require('../middleware/authMiddleware');
const { createProduct, getAllProduct } = require('../controllers/productController');
const { createVariant, getVariants } = require('../controllers/productVariantController');
const productRoutes=express.Router()

productRoutes.get('/',isLogin,getAllProduct)
productRoutes.post('/create',isLogin,authorize('admin'),createProduct)

productRoutes.get('/getVariants',isLogin,getVariants)
productRoutes.post('/createVariant',isLogin,authorize('admin'),createVariant)

module.exports={productRoutes}