import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/controller.js";
import { createNewTransaction, updateMonto} from "../controllers/pagosController.js";
const app = express();
const router= express.Router();

router.get("/", getAllUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


//Pagos
router.post('/pagos/transaccion/', createNewTransaction)
router.put('/pagos/transaccion/:id', updateMonto)

export default router