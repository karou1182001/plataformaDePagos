//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const tarjetaCreditoModel= db.define("tarjetacreditos",{
    idTarjeta: {type: DataTypes.INTEGER},
    numTarjeta: {type: DataTypes.STRING},
    codSeg: {type: DataTypes.INTEGER},
    fechaVenc:{type: DataTypes.DATE},
    tipoTarjeta:{type: DataTypes.STRING},
},{
    freezeTableName: true //El nombre del modelo es igual al de la tabla
  })

export default tarjetaCreditoModel