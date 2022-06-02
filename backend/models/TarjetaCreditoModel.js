//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const tarjetaCreditoModel= db.define("tarjetacredito",{
    idTarjetaCredito: {type: DataTypes.INTEGER},
    idTarjeta: {type: DataTypes.INTEGER},
    codSeg: {type: DataTypes.INTEGER},
    fechaVenc:{type: DataTypes.DATE},
    tipoTarjeta:{type: DataTypes.STRING},
},{
    freezeTableName: true
  })

export default tarjetaCreditoModel