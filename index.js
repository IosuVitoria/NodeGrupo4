const express = require('express'); // Traemos la librería express. Crea la base de datos.
const dotenv = require('dotenv');
dotenv.config();
const {connect} = require('./src/utils/db')

const productsRoutes = require('./src/api/routes/products.routes')
const suppliersRoutes = require('./src/api/routes/suppliers.routes')
const marketsRoutes = require('./src/api/routes/markets.routes')

const PORT = process.env.PORT;
const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/products", productsRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/markets", marketsRoutes);

app.listen(PORT, ()=> console.log(`Conectado al puerto: ${PORT}`))

