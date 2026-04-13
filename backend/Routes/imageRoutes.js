const express=require('express');
const imageController = require('../controllers/imageController');
const imageRoute=express.Router()
imageRoute.post('/create',imageController);
module.exports=imageRoute