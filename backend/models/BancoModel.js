//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const BancoModel= db.define("bancos",{
    nombre: {type: DataTypes.STRING},
    estado: {type: DataTypes.INTEGER}
},{
    freezeTableName: true//El nombre del modelo es igual al de la tabla
  })

export default BancoModel