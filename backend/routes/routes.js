import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/controller.js";
import { getidUsuario,getidTarjeta, createNewTransaction, getMonto, updateMonto} from "../controllers/pagosController.js";
import {registerUser} from "../controllers/UsuarioController.js"

const app = express();
const router= express.Router();

router.get("/", getAllUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


//Pagos
router.get('/pagos/transaccion/', getidUsuario)
router.get('/pagos/transaccion/tarjeta/', getidTarjeta)
router.post('/pagos/transaccion/', createNewTransaction)
router.get('/pagos/transaccion/:id', getMonto)
router.put('/pagos/transaccion/:id', updateMonto)

//Registro de usuario
router.post('/registrarusuario',registerUser)


export default router