//Este controlador es para realizar las operacionea CRUD en la base de datos

import UsersModel from "../models/UsersModel.js";


/*---------------------MÉTODOS PARA EL CRUD----------------------- */


//CREAR un usuario
export const registerUser= async (req, res)=>{
  try {
    var usuario= await UsersModel.findOne({
      where:{
        email: req.body.email
      }
    });
    if(usuario==null){
      await UsersModel.create(req.body);
    }else{
      res.json(usuario);
    }
  } catch (error) {
    res.json({message: error.message});
  }
}



