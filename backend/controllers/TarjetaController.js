//Este controlador es para realizar las operacionea CRUD en la base de datos

import TarjetaModel from "../models/TarjetaModel.js";
import TarjetaCreditoModel from "../models/TarjetaCreditoModel.js";
import tarjetaPSEModel from "../models/TarjetaPSEModel.js";
import BancoModel from "../models/BancoModel.js";
/*---------------------MÉTODOS PARA EL CRUD----------------------- */

//Consultar todas las tarjetas
export const getAllTarjetas= async (req, res)=>{
  try {
    var cont=0;
    var data=[new Map()];
    const tarjetas= await TarjetaModel.findAll();
    const tarjetasCredito= await TarjetaCreditoModel.findAll();
    for (var i=0;i<tarjetas.length;i++){
      for (var index = 0; index < tarjetasCredito.length; index++) {
        if(tarjetas[i].id==tarjetasCredito[index].idTarjeta && req.params.id==tarjetas[i].idTitular){
          console.log(tarjetas[i].monto);
          var nombres = tarjetasCredito[index].fechaVenc;
          var listaNombres = nombres.split(' ');
          data[cont]={
            'id': tarjetas[i].id,
            'monto': tarjetas[i].monto,
            'tipo':tarjetasCredito[index].tipoTarjeta,
            'codSeg':tarjetasCredito[index].codSeg,
            //'fechaVenc':listaNombres[0],
            'fechaVenc': "11/23",
            'numTarjeta': tarjetasCredito[index].numTarjeta
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
    const tarjetas= await TarjetaModel.findAll();
    const tarjetasPSE= await tarjetaPSEModel.findAll();
    const bancos= await BancoModel.findAll();
    for (var i=0;i<tarjetas.length;i++){
      for (var index = 0; index < tarjetasPSE.length; index++) {
        if(tarjetas[i].id==tarjetasPSE[index].idTarjeta && req.params.id==tarjetas[i].idTitular){
          for (var index2 = 0; index2 < bancos.length; index2++) {
            if(tarjetasPSE[index].idBanco==bancos[index2].id){
              var nombreBanco=bancos[index2].nombre;
              var estadoBanco=bancos[index2].estado;
            }
          }
          if(estadoBanco==1){
            data[cont]={
              'id': tarjetas[i].id,
              'monto': tarjetas[i].monto,
              'tipoPersona':tarjetasPSE[index].tipoPersona,
              'idBanco': tarjetasPSE[index].idBanco,
              'nombreBanco':nombreBanco,
            }
            cont++;
            break;
          }
      }
        }
      }
    res.json(data);
  } catch (error) {
    res.json({message: error.message});
  }
}

export const getAllTarjetasPSE2= async (req, res)=>{
  try {
    var cont=0;
    var data=[new Map()];
    const tarjetas= await TarjetaModel.findAll();
    const tarjetasPSE= await tarjetaPSEModel.findAll();
    const bancos= await BancoModel.findAll();
    for (var i=0;i<tarjetas.length;i++){
      for (var index = 0; index < tarjetasPSE.length; index++) {
        if(tarjetas[i].id==tarjetasPSE[index].idTarjeta && req.params.id==tarjetas[i].idTitular){
          for (var index2 = 0; index2 < bancos.length; index2++) {
            if(tarjetasPSE[index].idBanco==bancos[index2].id){
              var nombreBanco=bancos[index2].nombre;
              var estadoBanco=bancos[index2].estado;
            }
          }
            data[cont]={
              'id': tarjetas[i].id,
              'monto': tarjetas[i].monto,
              'tipoPersona':tarjetasPSE[index].tipoPersona,
              'idBanco': tarjetasPSE[index].idBanco,
              'nombreBanco':nombreBanco,
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



//Consultar una tarjeta
export const getTarjeta= async (req, res)=>{
  try {
    const user= await TarjetaModel.findAll({
      where:{
        id: req.params.id
      }
    });
    res.json(user[0]);
  } catch (error) {
    res.json({message: error.message});
  }
}

//Crear una tarjeta de credito
export const createTarjeta= async (req, res)=>{
  try {
    var data={
      monto: req.body.monto,
      idTitular:req.body.id
    }
    await TarjetaModel.create(data);
    const tarjetas= await TarjetaModel.findAll();
    var data2={
      idTarjeta: tarjetas[tarjetas.length-1].id,
      codSeg:req.body.codSeg,
      fechaVenc:req.body.fechaVenc,
      tipoTarjeta: req.body.tipoTarjeta,
      numTarjeta: req.body.numTarjeta
    }
    console.log('El valor del numero es :' +req.body.numTarjeta);
    await TarjetaCreditoModel.create(data2);
    res.json({"message": "Tarjeta ingresada con exito"});

  } catch (error) {
    res.json({message: error.message+"aquiiiii"});
  }
}

//Crear una tarjeta PSE
export const createTarjetaPSE= async (req, res)=>{
  try {
    console.log(req.body)
    var aux=0;
    var data={
      monto: req.body.monto,
      idTitular:req.body.id
    }
    await TarjetaModel.create(data);
    const tarjetas= await TarjetaModel.findAll();
    const bancos= await BancoModel.findAll();
    bancos.forEach(element => {
      if(element.nombre==req.body.nombre){
        aux=element.id;
      }
    });
    var data2={
      idTarjeta: tarjetas[tarjetas.length-1].id,
      tipoPersona:req.body.tipoPersona,
      idBanco:aux,
    }
    await tarjetaPSEModel.create(data2);
    res.json({"message": "Tarjeta ingresada con exito"});
  } catch (error) {
    res.json({message: error.message});
  }
}

//ACTUALIZAR un usuario
export const updateTarjeta= async (req, res)=>{
  try {
    await TarjetaModel.update(req.body, {
      where: {id: req.params.id}
    });
    res.json({"message": "Usuario actualizado"});

  } catch (error) {
    res.json({message: error.message});
  }
}

//Eliminar una tarjeta
export const deleteTarjeta= async (req, res)=>{
  try {
    await TarjetaModel.destroy({
      where: {id: req.params.id}
    });
    res.json({"message": "Tarjeta eliminada"});
  } catch (error) {
    res.json({message: error.message});
  }
}

export const validarUsuario= async (req, res)=>{
  try {
    const tarjeta = await TarjetaModel.findOne({
      where: {idTitular: req.params.id
      }
    });
    const tarjetapse = await tarjetaPSEModel.findOne({
      where: {idTitular: req.params.id
      }
    });
    res.json({tarjeta});
  } catch (error) {
    res.json({message: error.message});
  }
}