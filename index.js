const express = require('express'); // Traemos la librería express. Crea la base de datos.
const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT;

const productsRoutes = require('./src/api/routes/products.routes');
const suppliersRoutes = require('./src/api/routes/suppliers.routes');
const marketsRoutes = require('./src/api/routes/markets.routes');
const userRoutes = require('./src/api/routes/users.routes');

const {connect} = require('./src/utils/db')
const { isAuth } = require('./src/middlewares/auth');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/products", isAuth, productsRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/markets", marketsRoutes);
app.use("/users", userRoutes);

app.listen(PORT, ()=> console.log(`Conectado al puerto: ${PORT}`))

