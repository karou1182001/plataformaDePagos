import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/controller.js";
const app = express();
const router= express.Router();

router.get("/", getAllUsers);
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router