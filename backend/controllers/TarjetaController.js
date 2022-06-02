//Este controlador es para realizar las operacionea CRUD en la base de datos

import tarjetaModel from "../models/TarjetaModel.js";
import tarjetaCreditoModel from "../models/TarjetaCreditoModel.js";
import tarjetaPSEModel from "../models/TarjetaPSEModel.js";
import BancoModel from "../models/BancoModel.js";
/*---------------------MÉTODOS PARA EL CRUD----------------------- */

//Consultar todas las tarjetas
export const getAllTarjetas= async (req, res)=>{
  try {
    var cont=0;
    var data=[new Map()];
    const tarjetas= await tarjetaModel.findAll();
    const tarjetasCredito= await tarjetaCreditoModel.findAll();
    for (var i=0;i<tarjetas.length;i++){
      for (var index = 0; index < tarjetasCredito.length; index++) {
        if(tarjetas[i].idTarjeta==tarjetasCredito[index].idTarjeta){
          data[cont]={
            'id': tarjetas[i].id,
            'idTarjeta': tarjetas[i].idTarjeta,
            'monto': tarjetas[i].monto,
            'tipo':tarjetasCredito[index].tipoTarjeta,
            'codSeg':tarjetasCredito[index].codSeg,
            'fechaVenc':tarjetasCredito[index].fechaVenc
          }
          cont++;
          break;
        }
        }
      }
    res.json(data);
  } catch (error) {
    res.json({message: error.message});
  }
}

export const getAllTarjetasPSE= async (req, res)=>{
  try {
    var cont=0;
    var data=[new Map()];
    const tarjetas= await tarjetaModel.findAll();
    const tarjetasPSE= await tarjetaPSEModel.findAll();
    const bancos= await BancoModel.findAll();
    for (var i=0;i<tarjetas.length;i++){
      for (var index = 0; index < tarjetasPSE.length; index++) {
        if(tarjetas[i].idTarjeta==tarjetasPSE[index].idTarjeta){
          for (var index2 = 0; index2 < bancos.length; index2++) {
            if(tarjetasPSE[index].idBanco==bancos[index2].idBanco){
              var nombreBanco=bancos[index2].nombre;
            }
          }
        data[cont]={
          'id': tarjetas[i].id,
          'idTarjeta': tarjetas[i].idTarjeta,
          'monto': tarjetas[i].monto,
          'tipoPersona':tarjetasPSE[index].tipoPersona,
          'idBanco': tarjetasPSE[index].idBanco,
          'nombreBanco':nombreBanco
        }
        cont++;
        break;
      }
        }
      }
    res.json(data);
    console.log(bancos);
  } catch (error) {
    res.json({message: error.message});
  }
}



//Consultar una tarjeta
export const getTarjeta= async (req, res)=>{
  try {
    const user= await tarjetaModel.findAll({
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
export const createTarjeta= async (req, res)=>{
  try {
    await tarjetaModel.create(req.body);
    res.json({"message": "Usuario ingresado"});

  } catch (error) {
    res.json({message: error.message});
  }
}

//ACTUALIZAR un usuario
export const updateTarjeta= async (req, res)=>{
  try {
    await tarjetaModel.update(req.body, {
      where: {id: req.params.id}
    });
    res.json({"message": "Usuario actualizado"});

  } catch (error) {
    res.json({message: error.message});
  }
}

//ELIMINAR un usuario
export const deleteTarjeta= async (req, res)=>{
  try {
    await tarjetaModel.destroy({
      where: {id: req.params.id}
    });
    res.json({"message": "Tarjeta eliminada"});

  } catch (error) {
    res.json({message: error.message});
  }
}