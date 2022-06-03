import express from "express";
import { createTarjeta, deleteTarjeta, getAllTarjetas,getAllTarjetasPSE} from "../controllers/TarjetaController.js";
const app = express();
const router= express.Router();

router.get("/", getAllTarjetas)
router.get("/PSE", getAllTarjetasPSE)
//router.get('/:id', getUser)
router.post('/', createTarjeta)
//router.put('/:id', updateUser)
router.delete('/:id', deleteTarjeta)

export default router