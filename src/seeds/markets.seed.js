const mongoose = require("mongoose");

const Market = require("../api/models/markets.model");

const arrayMarket = [
  {
    name: 'LidL',
    location: 'Plaza Tirso de Molina 15, Madrid',
    products: [],
    suppliers: []
  },
  {
  name: 'El Golden Supermercado',
    location: 'Plaza de Santa Catalina 2, Madrid',
    products: [],
    suppliers: []
  },
  {
  name: 'Supermarket Santa Ana',
        location: 'Calle Nuñez de Arce 7, Madrid',
        products: [],
        suppliers: []
    },
    {
        name: 'Bon Àrea',
        location: 'Calle Palencia 24, Barcelona',
        products: [],
        suppliers: []
    },
    {
        name: 'COVIRAN Supermercado',
        location: 'Carrer del Freser 212, Barcelona',
        products: [],
        suppliers: [],
    },
    {
        name: 'Carrefour Market',
        location: 'Calle Orense 48, Madrid',
        products: [],
        suppliers: [],
    }];


mongoose.connect(DB_URL)
.then(async () => {
    const allMarkets = await Market.find();
    if(allMarkets.length > 0){
        await Market.collection.drop();
        console.log("Markets deleted");
    }
})
.catch((error) => console.log("error deleting markets", error))
.then(async () => {
    const MarketMap = arrayMarket.map((market) => new Market(market));
    await Market.insertMany(MarketMap);
    console.log("markets inserted");
})
.catch((error) => console.log("error inserting markets", error))
.finally(() => mongoose.disconnect());