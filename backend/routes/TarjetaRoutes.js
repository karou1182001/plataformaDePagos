import express from "express";
import { deleteTarjeta, getAllTarjetas,getAllTarjetasPSE} from "../controllers/TarjetaController.js";
const app = express();
const router= express.Router();

router.get("/", getAllTarjetas)
router.get("/PSE", getAllTarjetasPSE)
/*router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)*/
router.delete('/:id', deleteTarjeta)

export default router