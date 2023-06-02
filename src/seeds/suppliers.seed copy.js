const mongoose = require("mongoose");

const Supplier = require("../API/models/Supplier.models");

const Suppliers = [


]


mongoose.connect("mongodb+srv://root:root@cluster0.v9ahybh.mongodb.net/Movies?retryWrites=true&w=majority")
.then(async () => {
    const allSuppliers = await Supplier.find();
    if(allMovies.length > 0){
        await Supplier.collection.drop();
        //collection.drop() => Te vacía la colección entera.
        console.log("Proveedores borrados");
    }
})
.catch((error) => console.log("error borrando proveedores", error))
.then(async () => {
    const SupplierMap = movies.map((movie) => new Supplier(movie));
    await Supplier.insertMany(SupplierMap);
    console.log("Proveedores insertadas");
})
.catch((error) => console.log("error insertando películas", error))
.finally(() => mongoose.disconnect());