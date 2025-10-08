import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { autorizeToken, soloAdmin, personal } from "../middlewares/authMiddleware.js";

import {
  registrarUsuario,
  loginUsuario,
  obtenerPerfilUsuario,
  actualizarPerfil,
  recuperarContrasena,
  logoutUsuario,
  obtenerPreguntasUsuario, // <-- Se agrega
  resetearConPreguntas      // <-- Se agrega
} from "../controllers/usuariosController.controller.js";

const router = express.Router();

// 📌 Middleware de autenticación
function auth(req, res, next) {
  if (req.session?.usuario) {
    next();
  } else {
    res.status(401).send("No autorizado");
  }
}

// 📌 Configuración de multer para subir fotos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({ storage });

// 📌 Rutas públicas
router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
router.post("/recuperar", recuperarContrasena);

// 📌 Rutas protegidas (requieren sesión)
router.get("/perfil", autorizeToken, obtenerPerfilUsuario);
router.post('/actualizar-perfil', autorizeToken, upload.single('foto'), actualizarPerfil);
router.get("/logout", logoutUsuario);
// Por Preguntas de Seguridad (NUEVAS)
router.post("/obtener-preguntas", obtenerPreguntasUsuario);
router.post("/resetear-con-preguntas", resetearConPreguntas);

export default router;
