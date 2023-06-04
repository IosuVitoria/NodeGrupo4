const express = require('express'); // Traemos la librería express. Crea la base de datos.
const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require("cloudinary").v2;
const documentacion = require('./src/doc/index.json');
const cors = require('cors');
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

//VAMOS A PONER DE RESPUESTA
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, PATCH'); //Decimos que metodos tenemos permitidos
  res.header('Access-Control-Allow-Credentials', 'true'); //permitimos la conexión con credenciales(Bearer token)
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // permitimos los headers del tipo Content-Type
  next();
})

//VAMOS A CONFIGURAR LOS CORS
//CORS --> CORS ORIGIN RESOURCE SHARING --> Intercambio de recursos cruzados -> manera de permir el compartir recursos enntre distintos origenes
app.use(cors(
  {
    origin: ["http://localhost:3000","http://localhost:4200","http://127.0.0.1:5500"],  //si sabemos origenes podemos ponerlos en un array
    // origin: "*", // permito todas las conexiones
    credentials: true
  }
))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/products", isAuth, productsRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/markets", marketsRoutes);
app.use("/users", userRoutes);

//Acceso a documentación
app.use('/', (req, res) => {
  return res.json(documentacion);
})

//ponemos una ruta por si no se encontrase la ruta requerida
app.use('*', (req, res)=>{
  res.status(404).json('Route not found');
})

// errores inesperados
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(`Error: ${error.message || "Unexpected error"}`);
})

app.listen(PORT, ()=> console.log(`Conectado al puerto: ${PORT}`))

