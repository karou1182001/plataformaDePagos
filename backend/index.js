//Función: Aquí es lo que une todo del backend

/*-------------------VARIABLES--------------------- */
import express, { json } from "express";
import cors from "cors";
//Importamos la conexión a la base de datos
import db from "./database/db.js";
//Enrutador a los métodos del controlador
import userRoutes from "./routes/routes.js" 
import tarjetaRoutes from "./routes/TarjetaRoutes.js" 
import bancoRoutes from './routes/BancoRoutes.js'
const app = express();

app.use(cors());
app.use(json());
app.use("/users",userRoutes);
app.use("/tarjetas",tarjetaRoutes);
app.use('/bancosinactivos',bancoRoutes);


try {
    await db.authenticate();
    console.log('Connected to the MySQL server.');
} catch (error) {
    console.error('error: ' + error.message);
}


//Hacemos que la aplicación se abra en el puerto 3001
app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });
