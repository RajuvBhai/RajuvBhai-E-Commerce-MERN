const express = require('express');
const { getAllProducts, newProduct, getSingleProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProduct);

module.exports = router;