const express = require('express');
const {putSupplier, postSupplier, deleteSupplier, getSupplierByID,getSupplier} = require('../controllers/suppliers.controller');
const upload = require('../../middlewares/upload.file');

const supplierRoutes = express.Router();

supplierRoutes.get('/', getSupplier);
supplierRoutes.get('/id/:id', getSupplierByID);
supplierRoutes.post('/', upload.single('image'), postSupplier);
supplierRoutes.put('/:id', upload.single('image'), putSupplier);
supplierRoutes.delete('/:id',deleteSupplier);

module.exports = supplierRoutes;