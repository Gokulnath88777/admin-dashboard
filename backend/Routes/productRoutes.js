const express=require('express');
const {isAdmin ,isLogin}= require('../middleware/authMiddleware');
const { createProduct } = require('../controllers/productController');
const productRoutes=express.Router()


productRoutes.post('/create',createProduct)
module.exports={productRoutes}