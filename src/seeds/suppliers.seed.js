const mongoose = require("mongoose");

const Supplier = require("../API/models/suppliers.model");

const supplier = [
    
];


mongoose.connect("mongodb+srv://root:root@cluster0.v9ahybh.mongodb.net/Movies?retryWrites=true&w=majority")
.then(async () => {
    const allSuppliers = await Supplier.find();
    if(allSuppliers.length > 0){
        await Supplier.collection.drop();
        //collection.drop() => Te vacía la colección entera.
        console.log("Suppliers erased");
    }
})
.catch((error) => console.log("erasing error", error))
.then(async () => {
    const SupplierMap = supplier.map((movie) => new Supplier(supplier));
    await Supplier.insertMany(SupplierMap);
    console.log("Suppliers inserted");
})
.catch((error) => console.log("error inserting suppliers", error))
.finally(() => mongoose.disconnect());