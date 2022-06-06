import BancoModel from "../models/BancoModel.js";
export const bancosInactivos=async (req,res)=>{
    try {
      var nombreBancos=[];
      const bancos= await BancoModel.findAll({
        where:{estado:0}
      }
      );
      for(var i=0;i<bancos.length;i++){
        nombreBancos[i]=bancos[i].nombre;
      }
      res.json(nombreBancos);
    } catch (error) {
      res.json({message: error.message});
    }
  }