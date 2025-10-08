// routes/inventario.js
import express from "express";
import * as invCtrl from "../controllers/inventarios/inventarioController.controller.js";
import { autorizeToken, personal, soloAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CRUD de inventarios
router.post("/create",    autorizeToken, soloAdmin,  invCtrl.crearInventario);
router.get("/inventarios",autorizeToken, personal, invCtrl.listarInventarios);
router.put("/update", autorizeToken, soloAdmin,      invCtrl.actualizarInventario);
router.delete("/delete/:id",autorizeToken, soloAdmin,invCtrl.eliminarInventario);

// Catálogos
router.get("/tipos", autorizeToken,  invCtrl.listarTipos);
router.get("/estados",autorizeToken, invCtrl.listarEstados);

// Disponibilidad
router.get("/disponibles",autorizeToken, invCtrl.listarDisponibles);

export default router;
