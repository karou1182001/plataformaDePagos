//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const UsersModel= db.define("users",{
     userName: {type: DataTypes.STRING},
     email: {type: DataTypes.STRING},
     celular: {type: DataTypes.STRING},
     cc: {type: DataTypes.INTEGER},
     password:{type: DataTypes.STRING}
})

export default UsersModel