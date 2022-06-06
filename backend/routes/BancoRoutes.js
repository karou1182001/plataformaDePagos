import express from "express";
import { bancosInactivos } from "../controllers/BancoController.js";

const router= express.Router();

router.get('/',bancosInactivos);

export default router