const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../midlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

// Get All Products - /api/v1/products
exports.getAllProducts = catchAsyncError(async (req, res, next)=>{
    const apiFeatures = new APIFeatures(productModel.find(), req.query).search().filter();

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

// Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})


// Get single Products - /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if(!product) {        
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(201).json({
        success: true,
        product
    })
})


// Update Product - /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
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
})

// Delete Product - /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
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
})
