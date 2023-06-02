const mongoose = require("mongoose");

const Supplier = require("../api/models/suppliers.model");

const arraySuppliers = [
    {
      name: 'Campofrio',
      products: [],
      benefit: 7
    },
    {
      name: 'Milka',
      products: [],
      benefit: 3
    },
    {
      name: 'Nescafe',
      products: [],
      benefit: 2
    },
    {
      name: 'Carnicas Paco',
      products: [],
      benefit: 5.5
    },
    {
      name: 'Verduras Virto',
      products: [],
      benefit: 7.2
    },
];


mongoose.connect(process.env.DB_URL)
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
    const SupplierMap = arraySuppliers.map((supplier) => new Supplier(supplier));
    await Supplier.insertMany(SupplierMap);
    console.log("Suppliers inserted");
})
.catch((error) => console.log("error inserting suppliers", error))
.finally(() => mongoose.disconnect());