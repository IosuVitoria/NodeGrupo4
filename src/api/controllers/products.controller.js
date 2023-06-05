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

//Añadir Paginación
const getAllProducts = async (req, res) =>{
    try {
        //Se recogen las querys(page) y se establece el límite por página(limit)
        let {page, limit} = req.query;
        //Se cuenta el numero de elementos en products
        const numProducts = await Product.countDocuments();
        //Se establece un límite por página de 10
        limit = limit ? parseInt(limit) || 10: 10;
        //Se comprueba el numero máximo de páginas, ponemos un límite de 1
        let numPages = numProducts%limit > 0 ? numProducts/limit + 1: numProducts/limit;
        //Si no estaba establecido el límite de páginas, se establece en 1
        page = page > numPages ? numPages : page < 1 ? 1 : parseInt(page) || 1;
        //Se calcula el salto para intercalar los elementos
        const skip = (page - 1) * limit;
        const allProducts = await Product.find().skip(skip).limit(limit);
        const response = {
            info: {
                numProducts: numProducts,
                page: page,
                limit: limit,
                nextPage: numPages >= page +1 ? `/products?page=${page + 1}&limit=${limit}` : null,
                previusPage: page != 1 ? `/products?page=${page - 1}&limit=${limit}` : null
            },
            results: allProducts
        }
        return res.status(200).json(response);

        // const product = await Product.find();
        // if(!product){
        //    return res.status(404).json({message: 'Not found products'}); 
        // }
        // return res.status(200).json(product);
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

module.exports = {getProductByID, postProduct, deleteProduct, putProduct, getProduct, getAllProducts}