const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const db = require('./models');
require('dotenv').config()
const { productRoutes } = require('./Routes/productRoutes');
const authRoute = require('./Routes/authRoutes');
const categoryRoute = require('./Routes/categoryRoute');
const attributeRoute = require('./Routes/attributeRoutes');

db.sequelize.authenticate().
    then(() => console.log("Connected"))
    .catch((error) => console.log(error));

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})

const env = process.env.NODE_ENV || 'development';
console.log("Running env",env)
app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRoute)
app.use('/products', productRoutes)
app.use('/categories', categoryRoute)
app.use('/attributes',attributeRoute)
