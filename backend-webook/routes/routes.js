import express from "express";
import {createNewTransaction} from "../controllers/TransaccionController.js";

const app = express();
const router= express.Router();

router.post("/", createNewTransaction)

export default router