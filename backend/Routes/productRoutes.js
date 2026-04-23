const express=require('express');
const {isLogin, authorize}= require('../middleware/authMiddleware');
const { createProduct, getAllProduct, bulkCreation } = require('../controllers/productController');
const { createVariant, getVariants } = require('../controllers/productVariantController');
const upload = require('../middleware/upload');
const productRoutes=express.Router()

productRoutes.get('/get',isLogin,getAllProduct)
productRoutes.post('/create',isLogin,authorize('admin'),createProduct)

productRoutes.get('/getVariants',isLogin,getVariants)
productRoutes.post('/createVariant',isLogin,authorize('admin'),createVariant)

productRoutes.post('/bulk-upload',isLogin,authorize('admin'), upload.single('file'),bulkCreation)

module.exports={productRoutes}