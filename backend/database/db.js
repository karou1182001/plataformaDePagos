//Función: Aquí se hará la conexión con la base de datos
/*-------------------VARIABLES--------------------- */
import {Sequelize } from 'sequelize';

/*-------------------MÉTODOS---------------------- */

//Hace la conexión con la base de datos que actualmente está de manera local
//const db= new Sequelize("plat_de_pagos", "root", "112358", {host: "127.0.0.1", dialect: "mysql", port: "3307"})
//const db= new Sequelize("plat_de_pagos", "root", "112358", {host: "mysqldb", dialect: "mysql"})
const db = new Sequelize('mysql://root:112358@mysqldb:3306/plat_de_pagos')
//const db = new Sequelize('mysql://root:112358@localhost:3306/plat_de_pagos')

export default db