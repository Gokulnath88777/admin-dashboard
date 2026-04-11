const express=require('express')
const { isLogin, authorize } = require('../middleware/authMiddleware')
const { createCategory, getAllCategory } = require('../controllers/categoryController')
const categoryRoute=express.Router()

categoryRoute.get('/',isLogin,getAllCategory)
categoryRoute.post('/create',isLogin,authorize('admin'),createCategory)

module.exports=categoryRoute
