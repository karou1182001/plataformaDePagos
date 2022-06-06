import transaccionmodel from "../models/TransaccionModel.js";

export const createNewTransaction= async (req, res)=>{
    try {
      await transaccionmodel.create(req.body);
      res.json({"message": "Transacción realizada"});
      console.log(req.body);
      console.log("Transacción realizada");
  
    } catch (error) {
      res.json({message: error.message});
    }
  }