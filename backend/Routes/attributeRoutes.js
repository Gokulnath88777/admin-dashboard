const express=require('express')
const { isLogin, authorize } = require('../middleware/authMiddleware')
const { createAttribute, getAttributes } = require('../controllers/attributeController')
const { createValue } = require('../controllers/attributeValueController')
const joinAttribute = require('../controllers/attributeVariantController')
const attributeRoute=express.Router()

attributeRoute.get('/',isLogin,getAttributes)

attributeRoute.post('/create',isLogin,authorize('admin'),createAttribute)
attributeRoute.post('/createValue',isLogin,authorize('admin'),createValue)
attributeRoute.post('/join',isLogin,authorize('admin'),joinAttribute)

module.exports=attributeRoute