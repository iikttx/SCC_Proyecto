import express from "express";
import dotenv from "dotenv";
import { obtenerUsuarios, actualizarUsuario, eliminarUsuario } from "../controllers/registros/registroController.controller.js";
import { autorizeToken } from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";
dotenv.config();

const router = express.Router();

// ===========================================
// RUTAS DE REGISTROS DE USUARIOS
// ===========================================
// 📌 OBTENER
router.get("/getUsuarios",autorizeToken, obtenerUsuarios);

// ✅ ACTUALIZAR
router.put("/getUsuarios/:id",autorizeToken, actualizarUsuario);

// ✅ ELIMINAR
router.delete("/getUsuarios/:id",autorizeToken, eliminarUsuario);

router.get("/verify", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    res.json(decoded); // puedes devolver { id, rol, email, etc. }
  });
});


export default router;
