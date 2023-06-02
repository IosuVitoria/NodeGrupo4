const express = require('express');
const {putProduct, postProduct, deleteProduct, getProductByID, getProduct} = require('../controllers/products.controller');
const upload = require('../../middlewares/upload.file');


const productsRoutes = express.Router();

productsRoutes.get('/', getProduct);
productsRoutes.get('/id/:id', getProductByID);
productsRoutes.post('/', upload.single('image'), postProduct);
productsRoutes.put('/:id', upload.single('image'), putProduct);
productsRoutes.delete('/:id',deleteProduct);

module.exports = productsRoutes;