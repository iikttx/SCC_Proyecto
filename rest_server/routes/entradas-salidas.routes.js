import express from "express";
import dotenv from "dotenv";

import {
  getReportes,
  registerEntrada,
  getEntrada,
  registrarSalida,
  getSala,
} from "../controllers/entradas/entradaController.controller.js";
import {autorizeToken, personal, soloAdmin} from "../middlewares/authMiddleware.js";
const router = express.Router();

dotenv.config();
// ===========================================
// RUTAS DE ENTRADAS Y SALIDAS
// ===========================================
router.get("/genReporte",autorizeToken,soloAdmin, getReportes);
router.post("/registrarEntrada",autorizeToken,personal,registerEntrada);
router.get("/getEntradaSalida",autorizeToken,soloAdmin, getEntrada);
router.put("/registrarSalida",autorizeToken,personal, registrarSalida);
router.get("/getSalas",autorizeToken, getSala);


export default router;
