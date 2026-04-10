const express=require('express')
const app=express()
require('dotenv').config()
app.use(express.json());

const db=require('./models');
const { productRoutes } = require('./Routes/productRoutes');
db.sequelize.authenticate().
then(()=>console.log("Connected"))
.catch((error)=>console.log(error));


const port=process.env.PORT
// app.use('/login',isLogin,clg)
app.use('/product',productRoutes)
app.listen(port,()=>
{
    console.log(`server running on port ${port}`);
})
