//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes, Sequelize } from "sequelize";

const TransactionModel= db.define("transacciones",{
     valorTrans: {type: DataTypes.INTEGER},
     numCuotas: {type: DataTypes.INTEGER},
     fechaTrans: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
     },
     //horaTrans: {type: DataTypes.STRING},
     conceptoDePago: {type: DataTypes.STRING},
     sede: {type: DataTypes.STRING},
     franquicia: {type: DataTypes.STRING},
     exitosa: {type: DataTypes.INTEGER},
     idTarjeta: {type: DataTypes.INTEGER},
})

export default TransactionModel