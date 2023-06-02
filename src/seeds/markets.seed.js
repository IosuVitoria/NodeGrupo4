const mongoose = require("mongoose");

const Market = require("../api/models/markets.models");

const arrayProduct = [
    {
      name: 'Milk',
      price: 0.95,
      type: "Dairy",
      nutrients: ['Vitamin A', 'Lactose'],
      SKU: '000123',
    },
    {
      name: 'Beef',
      price: 6,
      type: "Meat",
      nutrients: ['Vitamin B12', 'Protein'],
      SKU: '000124',
    },
    {
      name: 'Chocolate',
      price: 1.5,
      type: "Dairy",
      nutrients: ['Vitamin B12', 'Manganese'],
      SKU: '000126',
    },
    {
      name: 'Tomates',
      price: 2,
      type: "Vegetables",
      nutrients: ['Vitamin C', 'Zinc'],
      SKU: '000128',
    },
    {
      name: 'Coffee',
      price: 2.5,
      type: "Drink",
      nutrients: ['Vitamin D', 'Niacin'],
      SKU: '000129',
    }
];


mongoose.connect(DB_URL)
.then(async () => {
    const allProducts = await Product.find();
    if(allProducts.length > 0){
        await Product.collection.drop();
        //collection.drop() => Te vacía la colección entera.
        console.log("products deleted");
    }
})
.catch((error) => console.log("error deleting products", error))
.then(async () => {
    const ProductMap = arrayProduct.map((product) => new Product(product));
    await Product.insertMany(ProductMap);
    console.log("products inserted");
})
.catch((error) => console.log("error inserting products", error))
.finally(() => mongoose.disconnect());