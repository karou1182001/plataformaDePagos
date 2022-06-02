//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const tarjetaModel= db.define("tarjeta",{
    idTarjeta: {type: DataTypes.INTEGER},
    monto: {type: DataTypes.INTEGER},
    idTitular: {type: DataTypes.INTEGER}
})

export default tarjetaModel