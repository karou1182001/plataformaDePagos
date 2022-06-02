//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const tarjetaPSEModel= db.define("tarjetapse",{
    idTarjetaPSE: {type: DataTypes.INTEGER},
    idTarjeta: {type: DataTypes.INTEGER},
    tipoPersona:{type: DataTypes.STRING},
    idBanco:{type: DataTypes.INTEGER},
},{
    freezeTableName: true
  })

export default tarjetaPSEModel