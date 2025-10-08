import dotenv from "dotenv";
import { connection } from "../../db/configdb.conf.js";

dotenv.config();

// 📌 Obtener todos
export const obtenerUsuarios = async (req, res) => {
  connection.query("SELECT id, nombre, apellido_paterno, apellido_materno,semestre, rol FROM usuarios", (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(200).json(results);
  });
};

// ✅ Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, rol } = req.body;

  connection.query(
    "UPDATE usuarios SET nombre = ?, rol = ? WHERE id = ?",
    [nombre, rol, id],
    (error, results) => {
      if (error) return res.status(500).json({ error });
      res.status(200).json({ message: "Usuario actualizado" });
    }
  );
};

// ✅ Eliminar usuario
// Eliminar huellas primero y luego el usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  // Paso 1: eliminar huellas
  connection.query("DELETE FROM huellas_usuario WHERE Usuarios_id = ?", [id], (err1) => {
    if (err1) {
      console.error("❌ Error al eliminar huellas:", err1);
      return res.status(500).json({ error: "Error al eliminar huellas" });
    }

    // Paso 2: eliminar usuario
    connection.query("DELETE FROM usuarios WHERE id = ?", [id], (err2) => {
      if (err2) {
        console.error("❌ Error al eliminar usuario:", err2); // 👈 esto es clave
        return res.status(500).json({ error: "Error al eliminar usuario" });
      }

      res.status(200).json({ message: "Usuario y huellas eliminados" });
    });
  });
};

