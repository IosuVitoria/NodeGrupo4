const express = require('express');
const {putMarketProduct, postMarkets, deleteMarket, getMarketByID, getMarket, putMarket} = require('../controllers/markets.controller');

const marketsRoutes = express.Router();



marketsRoutes.get('/', getMarket);
marketsRoutes.get('/id/:id', getMarketByID);
marketsRoutes.post('/',postMarkets);
marketsRoutes.put('/id/:id',putMarketProduct);
marketsRoutes.delete('/:id',deleteMarket);
marketsRoutes.put('/:id',putMarket);

module.exports = marketsRoutes;