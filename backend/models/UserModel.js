//Importamos la conexión a la base de datos
import db from "../database/db.js";
//Importamos sequelize
import { DataTypes } from "sequelize";

const UserModel= db.define("usuarios",{
     userName: {type: DataTypes.STRING}
})

export default UserModel