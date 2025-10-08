import express from "express";
import * as invCtrl from "../controllers/inventarios/inventarioController.controller.js";
// <-- CAMBIO CRÍTICO: Importar los middlewares de seguridad que vas a usar.
import { autorizeToken, personal, soloAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ===================================
// RUTAS PROTEGIDAS PARA ADMINISTRADORES
// ===================================
// Solo un administrador puede crear, actualizar o eliminar inventario.
router.post("/create", autorizeToken, soloAdmin, invCtrl.crearInventario);
router.put("/update", autorizeToken, soloAdmin, invCtrl.actualizarInventario);
router.delete("/delete/:id", autorizeToken, soloAdmin, invCtrl.eliminarInventario);

// ===================================
// RUTAS PARA TODO EL PERSONAL AUTENTICADO
// ===================================
// Cualquier usuario que haya iniciado sesión (admin o docente) puede ver las listas.
router.get("/inventarios", autorizeToken, personal, invCtrl.listarInventarios);
router.get("/tipos", autorizeToken, personal, invCtrl.listarTipos);
router.get("/estados", autorizeToken, personal, invCtrl.listarEstados);
router.get("/disponibles", autorizeToken, personal, invCtrl.listarDisponibles);

export default router;