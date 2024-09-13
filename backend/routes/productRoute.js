const express = require('express');
const { getAllProducts, newProduct, getSingleProduct, updateProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/new').post(newProduct);
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct);

module.exports = router;