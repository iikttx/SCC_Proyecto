import express from "express";
import * as prestCtrl from "../controllers/inventarios/prestamoController.controller.js";
import { autorizeToken, personal } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CAMBIO: Todas las rutas ahora requieren un token válido y un rol de "personal".
router.get("/licenciaturas", autorizeToken, personal, prestCtrl.listarLicenciaturas);
router.get("/posgrados", autorizeToken, personal, prestCtrl.listarPosgrados);
router.post("/", autorizeToken, personal, prestCtrl.crearPrestamo);

export default router;