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
    try {
        const { supplierId, productId } = req.body;
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            { $push: { products: productId } },
            { new: true }
        );
        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier no found." });
        }
        return res.status(200).json(updatedSupplier);
    } catch (error) {
        return next(error);
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