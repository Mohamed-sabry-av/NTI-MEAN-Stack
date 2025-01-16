const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('../node/config/db.config')
const {createTokens} = require('../Node/Auth/jwt')
const cors = require('cors')
const path = require('path');

//connect 
const port = 3000;
const app = express();
app.use(cors({
  origin:'http://localhost:4200'
}))
app.use(express.json());
connectDB();




//routers
const userRole = require('../node/router/UserRoleRouter')
const user = require('../node/router/UserRouter')
const ProductsCategory = require('../node/router/ProudctCategoryRouter')
const Products = require('../node/router/ProductRouter')

//Routes
app.use('/images',express.static('./imgs'));
app.use('/userRole', userRole)
app.use('/user', user)
app.use('/product', Products)
app.use('/productsCategory', ProductsCategory)

app.listen(port, () => {
    console.log(`server is connected via Port ${port}`);
  });
  