// routes/prestamo.js
import express from "express";
import * as prestCtrl from "../controllers/inventarios/prestamoController.controller.js";
import {autorizeToken, personal} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Catálogos
router.get("/licenciaturas", prestCtrl.listarLicenciaturas);
router.get("/posgrados", prestCtrl.listarPosgrados);

// Crear préstamo
router.post("/",prestCtrl.crearPrestamo);

export default router;
