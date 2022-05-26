//Función: Aquí se hará la conexión con la base de datos
/*-------------------VARIABLES--------------------- */
import {Sequelize } from 'sequelize';

/*-------------------MÉTODOS---------------------- */

//Hace la conexión con la base de datos que actualmente está de manera local
const db= new Sequelize("plat_de_pagos", "root", "112358", {host: "localhost", dialect: "mysql"});

/*const db = createConnection({
    host: "localhost",
    user: "root",
    password: "112358",
    database: "plat_de_pagos"
  });*/

 /* //Testea la conexión
  db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });*/

export default db