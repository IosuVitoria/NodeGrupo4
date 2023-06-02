const express = require('express');
const {putMarket, postMarkets, deleteMarket, getMarketByID, getMarket} = require('../controllers/markets.controller');

const marketsRoutes = express.Router();

marketsRoutes.get('/', getMarket);
marketsRoutes.get('/id/:id', getMarketByID);
marketsRoutes.post('/',postMarkets);
marketsRoutes.put('/:id',putMarket);
marketsRoutes.delete('/:id',deleteMarket);

module.exports = marketsRoutes;