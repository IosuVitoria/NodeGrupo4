const express = require('express');
const {putSupplier, postSupplier, deleteSupplier, getSupplierByID,getSupplier} = require('../controllers/suppliers.controller');

const supplierRoutes = express.Router();

supplierRoutes.get('/', getSupplier);
supplierRoutes.get('/id/:id', getSupplierByID);
supplierRoutes.post('/',postSupplier);
supplierRoutes.put('/',putSupplier);
supplierRoutes.delete('/:id',deleteSupplier);

module.exports = supplierRoutes;