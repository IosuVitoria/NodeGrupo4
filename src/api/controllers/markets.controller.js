const Market = require("../models/markets.model")

//Método GET para markets
const getMarketByID = async(req, res) => {
    try {
        const {id} = req.params;
        const market = await Market.findById(id);
        if(!market){
           return res.status(404).json({message: 'Not found market with that ID'}); 
        }
        return res.status(200).json(market);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getMarket = async(req, res) => {
    try {
        const market = await Market.find();
        if(!market){
           return res.status(404).json({message: 'Not found market'}); 
        }
        return res.status(200).json(market);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Método POST para markets.
const postMarkets =  async (req, res) => {
    try {
        const { name, location, products, suppliers } = req.body;
        const newMarket = new Market({
            name,
            location,
            products: products || [],
            suppliers: suppliers || []
        });
        const createdMarket = await newMarket.save();
        return res.status(201).json(createdMarket);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Método DELETE para cinema.
const deleteMarket = async (req, res) => {
    try {
        const { id } = req.params;
        //Se busca el cine por id.
        const marketDeleted = await Market.findByIdAndDelete(id);
        if (!marketDeleted) {
            return res.status(404).json({ message: "Erase action is not possible. Check market iD." });
        }
        return res.status(200).json(marketDeleted);
    } catch (error) {
        return next(error);
    }
};

//Método PUT para cinema.
const putMarket = async (req, res) => {
    try {
        const { productId } = req.params;
        const { marketId } = req.body;
        const updatedMarket = await Market.findByIdAndUpdate(
            marketId,
            { $push: { products: productId } },
            { new: true }
        );
        if (!updatedMarket) {
            return res.status(404).json({ message: "Market no found." });
        }
        return res.status(200).json(updatedMarket);
    } catch (error) {
        return next(error);
    }
};

module.exports = {putMarket, postMarkets, deleteMarket, getMarketByID,getMarket};