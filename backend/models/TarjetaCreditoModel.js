//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const TarjetaCreditoModel= db.define("tarjetacreditos",{
     idTarjeta: {type: DataTypes.INTEGER},
     numTarjeta: {type: DataTypes.INTEGER},
     codSeg: {type: DataTypes.INTEGER},
     monto: {type: DataTypes.INTEGER},
     fechaVenc: {type: DataTypes.STRING},
     tipoTarjeta: {type: DataTypes.STRING},
})

export default TarjetaCreditoModel