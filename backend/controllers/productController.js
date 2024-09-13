const productModel = require('../models/productModel');

// Get All Products - /api/v1/products
exports.getAllProducts = async (req, res, next)=>{
    const products = await productModel.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
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


// Get single Products - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(201).json({
        success: true,
        product
    })
}


// Update Product - /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if(!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product - /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Pruduct deleted successfully"
    });
}
