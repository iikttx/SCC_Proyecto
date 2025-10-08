// controllers/prestamoController.js
import { pool } from "../../db/configdb.conf.js";

// Listar licenciaturas (no necesita cambios)
export const listarLicenciaturas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nombre FROM licenciaturas");
    res.json(rows);
  } catch (err) {
    console.error("❌ ERROR al listar licenciaturas:", err);
    res.status(500).json({ error: "Error al obtener licenciaturas" });
  }
};

// Listar posgrados (no necesita cambios)
export const listarPosgrados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nombre FROM posgrados");
    res.json(rows);
  } catch (err) {
    console.error("❌ ERROR al listar posgrados:", err);
    res.status(500).json({ error: "Error al obtener posgrados" });
  }
};

// Crear préstamo
export const crearPrestamo = async (req, res) => {
  try {
    // <-- CAMBIO: Obtenemos el ID del usuario que hace la petición desde el token.
    const { id: id_usuario } = req.user;

    const {
      id_Prestamos, fecha, area, proposito, firma,
      inventario_id, licenciatura, posgrado
    } = req.body;

    // <-- CAMBIO: Insertamos el id_usuario real en la base de datos.
    await pool.query(
      `INSERT INTO prestamos
         (idPrestamo, fecha, area, Proposito, firma, id_usuario, Inventarios_id, licenciatura, posgrado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_Prestamos, fecha, area, proposito, Buffer.from(firma),
        id_usuario, // Se pasa el ID del usuario del token
        inventario_id, licenciatura, posgrado
      ]
    );

    // Marcar equipo como prestado
    await pool.query(
      `UPDATE inventarios SET id_disponible = 3 WHERE id = ?`,
      [inventario_id]
    );

    res.status(201).json({ mensaje: "Préstamo guardado correctamente" });
  } catch (err) {
    console.error("❌ ERROR al crear préstamo:", err);
    res.status(500).json({ error: "Error al guardar préstamo" });
  }
};