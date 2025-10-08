import { pool } from "../db/configdb.conf.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from 'fs';
import multer from 'multer';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // ⚠️ Cambia esto en producción

// 📌 REGISTRO DE USUARIO
export const registrarUsuario = async (req, res) => {
  try {
    let {
      id,
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      password,
      semestre,
      rol,
      licenciatura,
      posgrado,
      pregunta1,
      respuesta1,
      pregunta2,
      respuesta2
    } = req.body;

    // Normalizar correo
    correo = correo.trim().toLowerCase();

    // Verificar si el usuario o correo ya existen
    const [existing] = await pool.query(
      "SELECT * FROM usuarios WHERE id = ? OR correo = ?",
      [id, correo]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "El ID o correo ya está registrado" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await pool.query(
      `INSERT INTO usuarios
        (id, nombre, apellido_paterno, apellido_materno, correo, contrasena, semestre, rol, licenciatura, posgrado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, nombre, apellido_paterno, apellido_materno, correo, hashedPassword, semestre, rol, licenciatura || null, posgrado || null]
    );

    // Hashear y guardar las respuestas de seguridad
    if (pregunta1 && respuesta1) {
      const hashedRespuesta1 = await bcrypt.hash(respuesta1, 10);
      await pool.query(
        "INSERT INTO respuestas_seguridad (usuario_id, pregunta, respuesta) VALUES (?, ?, ?)",
        [id, pregunta1, hashedRespuesta1]
      );
    }

    if (pregunta2 && respuesta2) {
      const hashedRespuesta2 = await bcrypt.hash(respuesta2, 10);
      await pool.query(
        "INSERT INTO respuestas_seguridad (usuario_id, pregunta, respuesta) VALUES (?, ?, ?)",
        [id, pregunta2, hashedRespuesta2]
      );
    }

    // ✅ Respuesta exitosa
    res.status(201).json({ message: "Usuario registrado correctamente" });

    // Si prefieres redirigir:
    // res.redirect("/pages/login.html");

  } catch (error) {
    console.error("❌ ERROR AL REGISTRAR USUARIO:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// 📌 LOGIN DE USUARIO
export const loginUsuario = async (req, res) => {
  try {
    const { id, password } = req.body;
    console.log("🔐 Intento de login:", { id });

    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE id = ? OR correo = ?",
      [id, id]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.contrasena);

    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // ✅ Generar JWT
    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      },
      JWT_SECRET,
      { expiresIn: "4h" }
    );

    // Puedes devolver el token en JSON o como cookie HTTP-only
    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error("❌ ERROR AL INICIAR SESIÓN:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// 📌 OBTENER PERFIL (protegido con JWT)
export const obtenerPerfilUsuario = async (req, res) => {
  try {
    // ✅ Asegurarse de que req.user exista
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const userId = req.user.id;

    // ✅ Obtener datos del usuario
    const [rows] = await pool.query(
      `SELECT id, nombre, apellido_paterno, apellido_materno, correo,
              semestre, rol, licenciatura, posgrado, foto
       FROM usuarios WHERE id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    res.json({
      ...user,
      fotoUrl: user.foto ? `/uploads/${user.foto}` : "/pages/default-profile.png"
    });
  } catch (error) {
    console.error("❌ ERROR AL OBTENER PERFIL:", error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};


// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './public/uploads/';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `perfil_${req.user.id}${ext}`);
  }
});

export const upload = multer({ storage });

// Endpoint para actualizar perfil
export const actualizarPerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) return res.status(400).json({ error: "No se subió ninguna foto" });

    const fotoNombre = req.file.filename;

    // Actualizar solo la columna 'foto'
    await pool.query("UPDATE usuarios SET foto = ? WHERE id = ?", [fotoNombre, userId]);

    // Traer los datos actualizados para enviar al cliente
    const [rows] = await pool.query(
      "SELECT id, nombre, apellido_paterno, apellido_materno, correo, foto FROM usuarios WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    const user = rows[0];
    res.json({
      ...user,
      fotoUrl: user.foto ? `/uploads/${user.foto}` : "/pages/default-profile.png"
    });

  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
};

// 📌 RECUPERAR CONTRASEÑA (placeholder)
export const recuperarContrasena = (req, res) => {
  res.send("Funcionalidad de recuperación aún no implementada.");
};

// 📌 LOGOUT (opcional si manejas tokens en frontend)
export const logoutUsuario = (req, res) => {
  // El frontend simplemente elimina el token
  res.json({ message: "Logout exitoso. El token debe eliminarse en el cliente." });
};

// 📌 OBTENER PREGUNTAS DE SEGURIDAD DEL USUARIO
export const obtenerPreguntasUsuario = async (req, res) => {
    try {
        const { id } = req.body;
        const [rows] = await pool.query(
            "SELECT pregunta FROM respuestas_seguridad WHERE usuario_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado o sin preguntas." });
        }

        const preguntas = rows.map(item => item.pregunta);
        res.json({ preguntas });

    } catch (error) {
        console.error("❌ ERROR AL OBTENER PREGUNTAS:", error);
        res.status(500).json({ error: "Error en el servidor." });
    }
};

// 📌 RESETEAR CONTRASEÑA VERIFICANDO PREGUNTAS
export const resetearConPreguntas = async (req, res) => {
    try {
        const { id, respuesta1, respuesta2, password } = req.body;

        const [respuestasGuardadas] = await pool.query(
            "SELECT respuesta FROM respuestas_seguridad WHERE usuario_id = ?",
            [id]
        );

        if (respuestasGuardadas.length < 2) {
            return res.status(400).send("Error de configuración de seguridad del usuario.");
        }

        const esCorrecta1 = await bcrypt.compare(respuesta1, respuestasGuardadas[0].respuesta);
        const esCorrecta2 = await bcrypt.compare(respuesta2, respuestasGuardadas[1].respuesta);

        if (!esCorrecta1 || !esCorrecta2) {
            return res.status(401).send("Una o más respuestas son incorrectas.");
        }

        const hashed = await bcrypt.hash(password, 10);
        await pool.query(
            "UPDATE usuarios SET contrasena = ? WHERE id = ?",
            [hashed, id]
        );

        res.redirect("/pages/login.html?status=success");

    } catch (error) {
        console.error("❌ ERROR AL RESETEAR CON PREGUNTAS:", error);
        res.status(500).send("Error en el servidor.");
    }
};