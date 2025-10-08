import express from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";
import fs from "fs";
import PDFDocument from "pdfkit";
import { connection } from "../../db/configdb.conf.js";

export const router = express.Router();
dotenv.config();

export const getReportes = async (req, res) => {
  connection.query("SELECT * FROM ingreso_salas", (error, results) => {
    if (error) return res.status(500).json({ error: "Error en la consulta" });
    if (!results || results.length === 0) {
      return res.status(404).send("No hay datos de ingresos para generar el reporte.");
    }

    const ingresosPorSala = {};
    let totalHoras = 0, conteo = 0;

    results.forEach(({ hora_entrada, hora_salida, id_sala }) => {
      const entrada = dayjs(`2000-01-01T${hora_entrada}`);
      const salida  = dayjs(`2000-01-01T${hora_salida}`);
      const duracion = salida.diff(entrada, "minute")/60;
      totalHoras += duracion; conteo++;
      ingresosPorSala[id_sala] = (ingresosPorSala[id_sala]||0) + 1;
    });

    const promedioHoras = (totalHoras/conteo).toFixed(2);
    const salaMasUsada = Object.entries(ingresosPorSala).length
      ? Object.entries(ingresosPorSala).sort((a,b)=>b[1]-a[1])[0][0]
      : "No disponible";

    const doc = new PDFDocument();
    const filename = "reporte_ingresos.pdf";
    const stream = fs.createWriteStream(filename);
    doc.pipe(stream);

    doc.fontSize(20).text("Reporte de Ingresos a Salas",{align:"center"}).moveDown();
    doc.fontSize(14).text(`Promedio de duración por ingreso: ${promedioHoras} horas`);
    doc.text(`Sala más utilizada: Sala ${salaMasUsada}`);
    doc.text("Cantidad de ingresos por sala:");
    for (const [sala, cantidad] of Object.entries(ingresosPorSala)) {
      doc.text(`  - Sala ${sala}: ${cantidad} ingresos`);
    }
    doc.end();

    stream.on("finish", () => {
      res.download(filename, err => {
        if (err) {
          console.error("Error al descargar:", err);
          res.status(500).send("Error generando el reporte");
        } else {
          fs.unlinkSync(filename);
        }
      });
    });
  });
};


// Función para generar ID único
export const generateID = () => {
  const timestamp = Date.now(); // tiempo en ms
  const random = Math.floor(Math.random() * 1000); // número aleatorio 0-999
  return `ING-${timestamp}-${random}`;
};

// Registrar entrada de sala
// Registrar entrada de sala
export const registerEntrada = async (req, res) => {
  const { idSala } = req.body;
  const usuariosId = req.user.id; // usamos el id del token

  if (!idSala) {
    return res.status(400).json({ error: "Falta el idSala" });
  }

  // Generamos un ID único para cada registro (puede ser UUID o un timestamp)
  const idIngreso = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const sql = `
    INSERT INTO ingreso_salas
      (id_ingreso, fecha, hora_entrada, hora_salida, id_sala, id_usuario)
    VALUES
      (?, CURDATE(), CURTIME(), NULL, ?, ?)
  `;

  connection.query(sql, [idIngreso, idSala, usuariosId], (err, results) => {
    if (err) {
      console.error("Error al insertar entrada:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    // Retornamos el ID generado para referencia
    res.status(201).json({ 
      mensaje: "Registro añadido correctamente", 
      idIngreso, 
      affectedRows: results.affectedRows 
    });
  });
};

// Obtener todas las entradas (solo usuarios con rol admin)
export const getEntrada = async (req, res) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ error: "Solo administradores pueden ver todas las entradas" });
  }

  connection.query("SELECT * FROM ingreso_salas", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.status(200).json(results);
  });
};

// Registrar salida de sala
// Registrar salida de la última entrada del usuario
export const registrarSalida = async (req, res) => {
  const usuarioId = req.user.id; // usamos id del token

  // Buscar la última entrada sin salida registrada
  const sqlSelect = `
    SELECT id_ingreso 
    FROM ingreso_salas 
    WHERE id_usuario = ? AND hora_salida IS NULL
    ORDER BY fecha DESC, hora_entrada DESC
    LIMIT 1
  `;

  connection.query(sqlSelect, [usuarioId], (err, results) => {
    if (err) {
      console.error("Error al consultar la última entrada:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: "No hay una entrada registrada previamente" });
    }

    const idIngreso = results[0].id_ingreso;

    const sqlUpdate = `
      UPDATE ingreso_salas
      SET hora_salida = CURTIME()
      WHERE id_ingreso = ?
    `;
    connection.query(sqlUpdate, [idIngreso], (err2, results2) => {
      if (err2) {
        console.error("Error al registrar salida:", err2);
        return res.status(500).json({ error: "Error al registrar salida" });
      }

      res.status(200).json({ mensaje: "Salida registrada correctamente", idIngreso });
    });
  });
};

export const getSala = async (req, res) => {
  connection.query("SELECT * FROM salas", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.status(200).json(results);
  });
};
