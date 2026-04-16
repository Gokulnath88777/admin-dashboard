const express=require('express')
const { isLogin, authorize } = require('../middleware/authMiddleware')
const { createCategory, getAllCategory, editCategory, deleteCategory } = require('../controllers/categoryController')
const categoryRoute=express.Router()

categoryRoute.get('/get',isLogin,getAllCategory)
categoryRoute.post('/create',isLogin,authorize('admin'),createCategory)
categoryRoute.patch('/update/:id',isLogin,authorize('admin'),editCategory)
categoryRoute.delete('/delete/:id',isLogin,authorize('admin'),deleteCategory)

module.exports=categoryRoute
