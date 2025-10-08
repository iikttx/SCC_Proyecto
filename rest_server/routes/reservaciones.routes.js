import express from "express";

import dotenv from "dotenv";
import { autorizeToken, personal } from "../middlewares/authMiddleware.js";


import {
  actualizarReservacion,
  eliminarReservacion,
  reservarSala,
  obtenerUA,
  obtenerLicenciaturas,
  obtenerPosgrado,
  obtenerUAFiltradas,
  obtenerReservaciones
} from "../controllers/reservaciones/reservacionController.controller.js";




dotenv.config();


const router = express.Router();

router.get("/obtenerUA-filtradas",autorizeToken,personal, obtenerUAFiltradas);
router.get("/obtenerPosgrados",autorizeToken,personal, obtenerPosgrado);
router.get("/obtenerLicenciaturas", autorizeToken,personal, obtenerLicenciaturas);
router.get("/obtenerUA", autorizeToken, personal,obtenerUA);
router.get("/obtenerReservaciones", autorizeToken, personal,obtenerReservaciones);
router.post("/reservarSala", autorizeToken, personal,reservarSala);
router.put("/updReservacion/:tipoReservacion/:idReservacion", autorizeToken,personal, actualizarReservacion);
router.delete("/delReservacion/:idReservacion", autorizeToken, personal,eliminarReservacion);


export default router;