const mongoose = require("mongoose");

const Movie = require("../API/models/movie.models");

const movies = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      genre: 'Animación',
    },
    {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      genre: 'Ciencia ficción',
    },
    {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
      genre: 'Comedia romántica',
    },
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