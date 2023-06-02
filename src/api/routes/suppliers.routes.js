const express = require('express');
const {putSupplier, postSupplier, deleteSupplier, getSupplierByID} = require('../controllers/suppliers.controller');

const supplierRoutes = express.Router();

supplierRoutes.get('/id/:id', getSupplierByID);
supplierRoutes.post('/',postSupplier);
supplierRoutes.put('/',putSupplier);
supplierRoutes.delete('/:id',deleteSupplier);

module.exports = supplierRoutes;