//Este controlador es para realizar las operacionea CRUD en la base de datos

import UserModel from "../models/UserModel.js";


/*---------------------MÉTODOS PARA EL CRUD----------------------- */

//CONSULTAR todos los usuarios
export const getAllUsers= async (req, res)=>{
  try {
    const users= await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.json({message: error.message});
  }
}

//CONSULTAR Un usuario
export const getUser= async (req, res)=>{
  try {
    const user= await UserModel.findAll({
      where:{
        id: req.params.id
      }
    });
    res.json(user[0]);
  } catch (error) {
    res.json({message: error.message});
  }
}

//CREAR un usuario
export const createUser= async (req, res)=>{
  try {
    await UserModel.create(req.body);
    res.json({"message": "Usuario ingresado"});

  } catch (error) {
    res.json({message: error.message});
  }
}

//ACTUALIZAR un usuario
export const updateUser= async (req, res)=>{
  try {
    await UserModel.update(req.body, {
      where: {id: req.params.id}
    });
    res.json({"message": "Usuario actualizado"});

  } catch (error) {
    res.json({message: error.message});
  }
}

//ELIMINAR un usuario
export const deleteUser= async (req, res)=>{
  try {
    await UserModel.destroy({
      where: {id: req.params.id}
    });
    res.json({"message": "Usuario eliminado"});

  } catch (error) {
    res.json({message: error.message});
  }
}
