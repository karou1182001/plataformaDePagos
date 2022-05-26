//Función: Aquí se hará la conexión con la base de datos
/*-------------------VARIABLES--------------------- */
import {Sequelize } from 'sequelize';

/*-------------------MÉTODOS---------------------- */

//Hace la conexión con la base de datos que actualmente está de manera local
const db= new Sequelize("plat_de_pagos", "root", "112358", {host: "localhost", dialect: "mysql"});

export default db