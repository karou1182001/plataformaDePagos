//Este controlador es para realizar las operacionea CRUD en la base de datos

import TransactionModel from "../models/TransactionModel.js";
import TarjetaCreditoModel from "../models/TarjetaCreditoModel.js";
import TarjetaModel from "../models/TarjetaModel.js";
import UsersModel from "../models/UsersModel.js";


/*---------------------MÉTODOS PARA EL CRUD----------------------- */



//CREA una nueva transacción 
export const createNewTransaction= async (req, res)=>{
    try {
      await TransactionModel.create(req.body);
      res.json({"message": "Transacción realizada"});
      console.log("Transacción realizada");
  
    } catch (error) {
      res.json({message: error.message});
    }
  }
//CONSULTA el id del usuario que tiene la cédula y nombre que se le pasa por parámetro
export const getidUsuario= async (req, res)=>{
  try {
    //Buscamos el usuario que tenga esos parametros
    const usuario= await UsersModel.findAll({
      attributes: ['id'],
      where:{
        userName:  req.query.userName,
        cc:  req.query.cc
      }
    });
    res.json(usuario[0]);
  } catch (error) {
    res.json({message: error.message});
  }
}

//CONSULTA si los datos de tarjeta son correctos y devuelve su idTarjeta
export const getidTarjeta= async (req, res)=>{
  try {
    //Buscamos la tarjeta que tenga esos parámetros
    const tarjeta= await TarjetaCreditoModel.findAll({
      attributes: ['idTarjeta'],
      where:{
        numTarjeta: req.query.numTarjeta,
        codSeg: req.query.codSeg,
        fechaVenc: req.query.fechaVenc

      }
    });
    res.json(tarjeta[0]);
  } catch (error) {
    res.json({message: error.message});
  }
}


//CONSULTA el monto actual de la cuenta del usuario y que el idTarjeta y el usuario esté asociados
export const getMonto= async (req, res)=>{
  try {
    
    const tarjeta= await TarjetaModel.findAll({
      attributes: ['monto'],
      where:{
        id: req.params.id,
        idTitular: req.query.idTitular
      }
    });
    res.json(tarjeta[0]);
  } catch (error) {
    res.json({message: error.message});
  }
}


//ACTUALIZA el monto de la tarjeta del usuario que tiene ese idTarjeta y el usuario estén asociados
export const updateMonto= async (req, res)=>{
    try {
      //Buscamos la tarjeta que tenga ese id y ese usuario dueño
      await TarjetaModel.update(req.body, {
        where: {
          id: req.params.id,
          idTitular: req.query.idTitular
        }
      });
      res.json({"message": "Monto actualizado"});
      console.log("Monto actualizado");
  
    } catch (error) {
      res.json({message: error.message});
    }
  }
