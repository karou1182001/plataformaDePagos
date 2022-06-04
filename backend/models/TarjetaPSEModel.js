//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const tarjetaPSEModel= db.define("tarjetapses",{
    idTarjeta: {type: DataTypes.INTEGER},
    tipoPersona:{type: DataTypes.STRING},
    idBanco:{type: DataTypes.INTEGER},
},{
    freezeTableName: true //El nombre del modelo es igual al de la tabla
  })

export default tarjetaPSEModel