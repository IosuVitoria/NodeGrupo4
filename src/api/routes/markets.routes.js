const express = require('express');
const {putMarketProduct, postMarkets, deleteMarket, getMarketByID, getMarket, putMarket} = require('../controllers/markets.controller');
const upload = require('../../middlewares/upload.file');
const marketsRoutes = express.Router();



marketsRoutes.get('/', getMarket);
marketsRoutes.get('/id/:id', getMarketByID);
marketsRoutes.post('/',upload.single('image'), postMarkets);
marketsRoutes.put('/id/:id',putMarketProduct);
marketsRoutes.delete('/:id',deleteMarket);
marketsRoutes.put('/:id', upload.single('image'), putMarket);

module.exports = marketsRoutes;