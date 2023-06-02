const Product = require('../models/products.model');
const {deleteFile} = require('../../middlewares/delete.file');

//Metodo Get para Product
const getProductByID = async (req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
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

        if (req.file) {  // save the URL image from cloudinary to tne product image field
            newProduct.image = req.file.path;
        }

        const createProduct = await newProduct.save()
        console.log(req.file);
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

    if (req.file) {  // save the URL image from cloudinary to tne product image field
        putProduct.image = req.file.path;
    }

    putProduct._id = id;
    const updatedProduct = await Product.findByIdAndUpdate(id, putProduct, {new: true});

    console.log(updatedProduct.image);
    console.log(putProduct.image);
    if(updatedProduct.image !== putProduct.image){ // delete image in cloudinary if new image is in PUT
        deleteFile(updatedProduct.image);
    }

    return res.status(200).json(updatedProduct)

   } catch (error){
    return res.status(500).json(error)
   }
};

module.exports = {getProductByID, postProduct, deleteProduct, putProduct, getProduct}