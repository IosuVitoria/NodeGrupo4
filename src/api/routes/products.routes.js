const express = require('express');
const {putProduct, postProduct, deleteProduct, getProductByID} = require('../controllers/products.controller');

const productsRoutes = express.Router();

productsRoutes.get('/id/:id', getProductByID);
productsRoutes.post('/',postProduct);
productsRoutes.put('/',putProduct);
productsRoutes.delete('/:id',deleteProduct);

module.exports = productsRoutes;