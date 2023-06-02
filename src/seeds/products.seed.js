const mongoose = require("mongoose");

const Movie = require("../API/models/products.models");

const arrayProducts = [
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
    }
];


mongoose.connect("mongodb+srv://root:root@cluster0.v9ahybh.mongodb.net/Movies?retryWrites=true&w=majority")
.then(async () => {
    const allMovies = await Movie.find();
    if(allMovies.length > 0){
        await Movie.collection.drop();
        //collection.drop() => Te vacía la colección entera.
        console.log("Películas borradas");
    }
})
.catch((error) => console.log("error borrando películas", error))
.then(async () => {
    const MovieMap = movies.map((movie) => new Movie(movie));
    await Movie.insertMany(MovieMap);
    console.log("Películas insertadas");
})
.catch((error) => console.log("error insertando películas", error))
.finally(() => mongoose.disconnect());