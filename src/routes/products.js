const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products')

// CREATE --> POST
router.post('/product', productsController.createProduct);

// GET
router.get('/products', productsController.getAllProducts);

module.exports = router;