import express, { json } from "express";
import cors from "cors";
//Importamos la conexión a la base de datos
import db from "./database/db.js";
//Enrutador a los métodos del controlador


import transaccionroutes from './routes/routes.js'
const app = express();

app.use(cors());
app.use(json());
app.use("/",transaccionroutes);


try {
    await db.authenticate();
    console.log('Connected to the MySQL server.');
} catch (error) {
    console.error('error: ' + error.message);
}



//Hacemos que la aplicación se abra en el puerto 3001
app.listen(3002, () => {
    console.log("Yey, your server is running on port 3002");
  });
