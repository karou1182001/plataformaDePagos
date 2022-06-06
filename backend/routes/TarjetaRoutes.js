import express from "express";
import { createTarjeta, deleteTarjeta, getAllTarjetas,getAllTarjetasPSE,createTarjetaPSE, validarUsuario,getAllTarjetasPSE2} from "../controllers/TarjetaController.js";
const app = express();
const router= express.Router();

router.get("/:id", getAllTarjetas)
router.get("/PSE/:id", getAllTarjetasPSE)
router.get("/PSE2/:id", getAllTarjetasPSE2)

//router.get('/:id', getUser)
router.post('/', createTarjeta)
router.post('/PSE', createTarjetaPSE)
//router.put('/:id', updateUser)
router.delete('/:id', deleteTarjeta)

//Validar Usuario
router.get('/validarUsuario/:id', validarUsuario)


export default router