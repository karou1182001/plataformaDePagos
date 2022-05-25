//Función: Aquí se harán las conexiones

/*-------------------VARIABLES--------------------- */
const express = require("express");
const app = express();
const mysql = require('mysql');


/*-------------------MÉTODOS---------------------- */

//Hace la conexión con la base de datos que actualmente está de manera local
const db = mysql.createConnection({
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


  app.get("/", (req, res) => {
    /*const sqlInsert=  "INSERT INTO usuarios (userName) VALUES ('Juan')";
    db.query(sqlInsert, (error, result)=>{
        res.send("Hello Meii");
        console.log(error);
    });*/
  });
    








//Hacemos que la aplicación se abra en el puerto 3001
app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });