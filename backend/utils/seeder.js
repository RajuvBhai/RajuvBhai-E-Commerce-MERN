 const products = require('../data/products.json');
 const productModel =require('../models/productModel');
 const dotenv = require('dotenv');
 const connectDatabase = require('../config/database')

 dotenv.config({path:'backend/config/config.env'});
 connectDatabase();

 const seedProducts = async () => {
    try {        
        await productModel.deleteMany();
        console.log("Products Deleted");
        
        await productModel.insertMany(products);
        console.log("All products added");    

    } catch (error) {
        console.log(error.message);        
    }
    process.exit();
 }

 seedProducts(); 