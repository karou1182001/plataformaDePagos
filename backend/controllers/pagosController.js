//Este controlador es para realizar las operacionea CRUD en la base de datos

import TransactionModel from "../models/TransactionModel.js";
import TarjetaModel from "../models/TarjetaModel.js";


/*---------------------MÉTODOS PARA EL CRUD----------------------- */

//Crea una nueva transacción 
export const createNewTransaction= async (req, res)=>{
    try {
      await TransactionModel.create(req.body);
      res.json({"message": "Transacción realizada"});
      console.log("Transacción realizada");
  
    } catch (error) {
      res.json({message: error.message});
    }
  }

//Actualiza el monto de la tarjeta del usuario
export const updateMonto= async (req, res)=>{
    try {
      await TarjetaModel.update(req.body, {
        where: {id: req.params.id}
      });
      res.json({"message": "Monto actualizado"});
      console.log("Monto actualizado");
  
    } catch (error) {
      res.json({message: error.message});
    }
  }
