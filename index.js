const express = require('express'); // Traemos la librería express. Crea la base de datos.
const {connect} = require('./src/utils/db')
const dotenv = require('dotenv');
dotenv.config();

const productsRoutes = require('./src/api/routes/products.routes')

const PORT = process.env.PORT;
const app = express();
connect();
// Punto 6 del ejercicio V1.2 Terminar el CRUD de movies insertando las rutas.

app.use(express.json());
app.use(express.urlencoded({extended:false}))



// app.use("/products", productsRoutes);

app.listen(PORT, ()=> console.log(`Conectado al puerto: ${PORT}`))

