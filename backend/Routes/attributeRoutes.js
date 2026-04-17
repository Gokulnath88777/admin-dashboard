const express=require('express')
const { isLogin, authorize } = require('../middleware/authMiddleware')
const { createAttribute, getAttributes, editAttribute, deleteAttribute } = require('../controllers/attributeController')
const { createValue, getValue, editAttributeValue, deleteAttributeValue,  } = require('../controllers/attributeValueController')
const joinAttribute = require('../controllers/attributeVariantController')
const attributeRoute=express.Router()

attributeRoute.get('/get',isLogin,authorize('admin'),getAttributes)
attributeRoute.post('/create',isLogin,authorize('admin'),createAttribute)
attributeRoute.patch('/update/:id',isLogin,authorize('admin'),editAttribute)
attributeRoute.delete('/delete/:id',isLogin,authorize('admin'),deleteAttribute)

attributeRoute.post('/createValue',isLogin,authorize('admin'),createValue)
attributeRoute.get('/getValue/:id',isLogin,authorize('admin'),getValue)
attributeRoute.patch('/updateValue/:id',isLogin,authorize('admin'),editAttributeValue)
attributeRoute.delete('/deleteValue/:id',isLogin,authorize('admin'),deleteAttributeValue)

attributeRoute.post('/join',isLogin,authorize('admin'),joinAttribute)
module.exports=attributeRoute
