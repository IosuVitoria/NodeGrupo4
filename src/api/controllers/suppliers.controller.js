const Supplier = require("../models/suppliers.model")

//Método GET para suppliers
const getSupplierByID = async(req, res) => {
    try {
        const {id} = req.params;
        const supplier = await Supplier.findById(id);
        if(!supplier){
           return res.status(404).json({message: 'Not found supplier with that ID'}); 
        }
        return res.status(200).json(supplier);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getSupplier = async(req, res) => {
    try {
        const supplier = await Supplier.find().populate("products", "name price SKU");
        if(!supplier){
           return res.status(404).json({message: 'Not found supplier'}); 
        }
        return res.status(200).json(supplier);
    } catch (error) {
        return res.status(500).json(error);
    }
}


// Método POST para suppliers.
const postSupplier =  async (req, res) => {
    try {
        const { name, products, benefit } = req.body;
        const newSupplier = new Supplier({
            name,
            products: products || [],
            benefit
        });

        const createdSupplier = await newSupplier.save();
        return res.status(201).json(createdSupplier);
    } catch (error) {
        return next(error);
    }
};


//Método PUT para supplier.
const putSupplier = async (req, res) => {
    try{
        const {id} = req.params;
        const putSupplier = new Supplier (req.body);

        if (req.file) {  // save the URL image from cloudinary to tne product image field
            putSupplier.image = req.file.path;
        }

        putSupplier._id = id;
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, putSupplier, {new: true});
        
        console.log(updatedSupplier.image);
    console.log(putSupplier.image);
    if(updatedSupplier.image !== putSupplier.image){ // delete image in cloudinary if new image is in PUT
        deleteFile(updatedSupplier.image);
    }

        return res.status(200).json(updatedSupplier)
    } catch (error){
     return res.status(500).json(error)
    }
};

//Método DELETE para cinema.
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        //Se busca el cine por id.
        const supplierDeleted = await Supplier.findByIdAndDelete(id);
        if (!supplierDeleted) {
            return res.status(404).json({ message: "Erase action is not possible. Check supplier ID." });
        }
        return res.status(200).json(supplierDeleted);
    } catch (error) {
        return next(error);
    }
};

module.exports = {getSupplierByID, putSupplier, postSupplier, deleteSupplier,getSupplier};