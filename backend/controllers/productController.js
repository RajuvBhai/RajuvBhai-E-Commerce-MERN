const productModel = require('../models/productModel');


exports.getProducts = (req, res, next)=>{
    res.status(200).json({
        success: true,
        message: "This route will show all the products"
    })
}

// Create Product - /api/v1/product/new
exports.newProduct = async (req, res, next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}