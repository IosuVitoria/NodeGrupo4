const Product = require('../models/products.model');

//Metodo Get para Product
const getProductByID = async (req, res) =>{
    try {
        const {id} = req.params;
        const product = await product.findById(id);
        if(!product){
           return res.status(404).json({message: 'Not found product with that ID'}); 
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getProduct = async (req, res) =>{
    try {
        const product = await Product.find();
        if(!product){
           return res.status(404).json({message: 'Not found products'}); 
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Metodo POST para Product
const postProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const createProduct = await newProduct.save()
        return res.status(201).json(createProduct)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//Metodo DELETE para Product
const deleteProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        if(!deleteProduct){
            return res.status(404).json(`Message: ${'ID no reconocido'}`)
        }
        return res.status(200).json(deleteProduct);
    } catch (error) {
        return res.status(500).json(error)
    }
}

//Metodo PUT para Product
const putProduct = async (req, res) => {
   try{
    const {id} = req.params;
    const putProduct = new Product (req.body);
    putProduct._id = id;

    const updatedProduct = await Product.findByIdAndUpdate(id, putProduct, {new: true});
    return res.status(200).json(updatedProduct)
   } catch{
    return res.status(500).json(error)
   }
};

module.exports = {getProductByID, postProduct, deleteProduct, putProduct, getProduct}