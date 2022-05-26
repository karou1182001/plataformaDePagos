//ARCHIVO TEMPORAL COMO PLAN B

/*-------------------VARIABLES--------------------- */
import express, { json } from "express";
const app = express();
import { createConnection } from 'mysql';
import { urlencoded } from "body-parser";
import cors from "cors";


/*-------------------MÉTODOS---------------------- */

//Hace la conexión con la base de datos que actualmente está de manera local
const db = createConnection({
    host: "localhost",
    user: "root",
    password: "112358",
    database: "plat_de_pagos"
  });

  //Testea la conexión
  db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

  app.use(cors());
  app.use(json());
  app.use(urlencoded({extended: true}));


  //Método para CONSULTAR dentro de la base de datos:
  app.get("/getUsers", (req, res) => {
    const query= "SELECT * FROM usuarios";
    db.query(query, (error, result) => {
      if (error) {
        //Si hay algún error haciendo la consulta
        //Lo imprimimos en consola
        console.log(error);
      } else {
        //Si no hay ningún error, enviamos la información
        //al frontend
        res.send(result);
      }
    });
  });
    

  //Método para INSERTAR dentro de la base de datos:
  //Cuando el usuario entre a la ruta create, va a tomar la variable req.body.userName
  //que se le envía del frontend y con ella hará un insert en la base de datos
  app.post("/create", (req, res)=> {
    //Var del frontend
    const userName= req.body.userName;
    //Insertar
    const sqlInsert=  "INSERT INTO usuarios (userName) VALUES (?)";
    db.query(sqlInsert, [userName], (error, result)=>{
      console.log(result);
    });
  });

   //Método para ACTUALIZAR dentro de la base de datos:
  app.put("/update", (req, res)=>{
    //Var del frontend
    const userName= req.body.userName;
    const newUserName= req.body.newUserName;
    //Eliminar
    const sqlUpdate= "UPDATE usuarios SET userName = ? WHERE userName= ?";
    db.query(sqlUpdate, [newUserName, userName], (error, result)=>{
      if (error) {
        //Si hay algún error haciendo la consulta
        //Lo imprimimos en consola
        console.log(error);
      } 
    });
  });

  
  //Método para ELIMINAR dentro de la base de datos:
  //Cuando el usuario oprima delete, se pasará la siguiente ruta que a través
  //de la url pasará la varible userName con el nombre del usuario a eliminar
  app.delete("/delete/:userName", (req, res)=>{
    //Var pasada a través del link
    const userName= req.params.userName;
    //Eliminar
    const sqlDelete= "DELETE FROM usuarios WHERE userName = ?";
    db.query(sqlDelete, userName, (error, result)=>{
      if (error) {
        //Si hay algún error haciendo la consulta
        //Lo imprimimos en consola
        console.log(error);
      } 
    });
  });







//Hacemos que la aplicación se abra en el puerto 3001
app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });

