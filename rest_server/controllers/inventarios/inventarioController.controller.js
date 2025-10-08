
import { pool } from "../../db/configdb.conf.js";

// 📌 Crear nuevo inventario
export const crearInventario = async (req, res) => {
  try {
    const { modelo, marca, estado, num_serie, descripcion, tipo, id_disponible } = req.body;
    if (!id_disponible || isNaN(id_disponible)) {
      return res.status(400).json({ error: "id_disponible inválido" });
    }
    await pool.query(
      `INSERT INTO inventarios
         (modelo, marca, estado, num_serie, descripcion, tipo, id_disponible)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [modelo, marca, estado, num_serie, descripcion, tipo, id_disponible]
    );
    res.status(201).json({ mensaje: "Inventario creado" });
  } catch (error) {
    console.error("❌ ERROR AL CREAR INVENTARIO:", error);
    res.status(500).json({ error: "Error al crear inventario" });
  }
};

// 📌 Obtener lista de tipos de equipo
export const listarTipos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_tipo, nombre FROM tipo_equipo");
    res.json(rows);
  } catch (error) {
    console.error("❌ ERROR AL LISTAR TIPOS:", error);
    res.status(500).json({ error: "Error al obtener tipos" });
  }
};

// 📌 Obtener lista de estados
export const listarEstados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_estado, nombre FROM tipo_estado");
    res.json(rows);
  } catch (error) {
    console.error("❌ ERROR AL LISTAR ESTADOS:", error);
    res.status(500).json({ error: "Error al obtener estados" });
  }
};

// 📌 Obtener todos los inventarios
export const listarInventarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         i.id, i.modelo, i.marca, i.estado, i.num_serie, i.descripcion,
         t.nombre AS tipo_nombre,
         e.nombre AS estado_nombre
       FROM inventarios i
       JOIN tipo_equipo t ON i.tipo = t.id_tipo
       JOIN tipo_estado e ON i.id_disponible = e.id_estado`
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ ERROR AL LISTAR INVENTARIOS:", error);
    res.status(500).json({ error: "Error al obtener inventarios" });
  }
};

// 📌 Actualizar un inventario existente
export const actualizarInventario = async (req, res) => {
  try {
    const { id, modelo, marca, estado, num_serie, descripcion, tipo, id_disponible } = req.body;
    if (!id_disponible || isNaN(id_disponible)) {
      return res.status(400).json({ error: "id_disponible inválido" });
    }
    await pool.query(
      `UPDATE inventarios
         SET modelo = ?, marca = ?, estado = ?, num_serie = ?, descripcion = ?, tipo = ?, id_disponible = ?
       WHERE id = ?`,
      [modelo, marca, estado, num_serie, descripcion, tipo, id_disponible, id]
    );
    res.json({ mensaje: "Inventario actualizado" });
  } catch (error) {
    console.error("❌ ERROR AL ACTUALIZAR INVENTARIO:", error);
    res.status(500).json({ error: "Error al actualizar inventario" });
  }
};

// 📌 Eliminar un inventario
export const eliminarInventario = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM inventarios WHERE id = ?", [id]);
    res.json({ mensaje: "Inventario eliminado" });
  } catch (error) {
    console.error("❌ ERROR AL ELIMINAR INVENTARIO:", error);
    res.status(500).json({ error: "Error al eliminar inventario" });
  }
};

// 📌 Listar solo los inventarios disponibles
export const listarDisponibles = async (req, res) => {
  try {
    const { tipo } = req.query;
    let sql = `
      SELECT 
        i.id, i.modelo, i.marca, i.estado, i.num_serie, i.descripcion,
        t.nombre AS tipo_nombre,
        e.nombre AS estado_nombre
      FROM inventarios i
      JOIN tipo_equipo t ON i.tipo = t.id_tipo
      JOIN tipo_estado e ON i.id_disponible = e.id_estado
      WHERE i.id_disponible = 1`;
    const params = [];
    if (tipo) {
      sql += " AND i.tipo = ?";
      params.push(tipo);
    }
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    console.error("❌ ERROR AL LISTAR DISPONIBLES:", error);
    res.status(500).json({ error: "Error al obtener disponibles" });
  }
};
