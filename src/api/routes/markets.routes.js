const express = require('express');
const {putMarket, postMarkets, deleteMarket, getMarketByID} = require('../controllers/markets.controller');

const marketsRoutes = express.Router();

marketsRoutes.get('/id/:id', getMarketByID);
marketsRoutes.post('/',postMarkets);
marketsRoutes.put('/',putMarket);
marketsRoutes.delete('/:id',deleteMarket);

module.exports = marketsRoutes;