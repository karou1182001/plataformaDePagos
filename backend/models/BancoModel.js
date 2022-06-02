//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const BancoModel= db.define("banco",{
    idBanco:{type: DataTypes.INTEGER},
    nombre: {type: DataTypes.STRING},
    estado: {type: DataTypes.INTEGER}
},{
    freezeTableName: true
  })

export default BancoModel