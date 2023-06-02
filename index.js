const express = require('express'); // Traemos la librería express. Crea la base de datos.
const {connect} = require('./src/utils/db')
const moviesRoutes = require('./src/API/routes/movies.routes')
const cinemaRoutes = require('./src/API/routes/cinema.routes')

const PORT = 5000;
const app = express();
connect();

// Punto 6 del ejercicio V1.2 Terminar el CRUD de movies insertando las rutas.

app.use(express.json());
app.use(express.urlencoded({extended:false}))



app.use("/movies", moviesRoutes);
app.use("/cinemas", cinemaRoutes);

app.listen(PORT, ()=> console.log(`Conectado al puerto: ${PORT}`))

