import dotenv from "dotenv";
import { connection } from "../../db/configdb.conf.js";

dotenv.config();

// RESERVAR SALA
export const reservarSala = async (req, res) => {
  const datos = req.body;

  // 🔐 ID del usuario autenticado desde el token
  const usuarioId = req.user.id;

  const obtenerUltimoID = `
    SELECT id_reservacion FROM reservaciones_salas
    ORDER BY id_reservacion DESC
    LIMIT 1
  `;

  connection.query(obtenerUltimoID, (err, resultado) => {
    if (err) {
      console.error("Error al consultar último ID:", err);
      return res.status(500).json({ error: "Error interno al obtener el último ID" });
    }

    // Generar nuevo ID incremental
    let nuevoID = "RS001";
    if (resultado.length > 0 && resultado[0].id_reservacion) {
      const ultimoID = resultado[0].id_reservacion;
      const numero = parseInt(ultimoID.replace("RS", "")) + 1;
      nuevoID = "RS" + numero.toString().padStart(3, "0");
    }

    // Reemplazar "" por null para evitar error de clave foránea
    const posgradoFinal =
      datos.posgrado && datos.posgrado.trim() !== "" ? datos.posgrado : null;
    const licenciaturaFinal =
      datos.licenciatura && datos.licenciatura.trim() !== "" ? datos.licenciatura : null;

    const insertar = `
      INSERT INTO reservaciones_salas 
      (id_reservacion, fecha, inicio_hora_reservacion, fin_hora_reservacion, motivo, tipo_reservacion, id_usuario, id_sala, posgrado, licenciatura, unidad_aprendizaje)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      nuevoID,
      datos.fecha,
      datos.inicio,
      datos.fin,
      datos.motivo,
      datos.tipoReservacion,
      usuarioId, // 👈 se usa el id del token, no del body
      datos.idSala,
      posgradoFinal,
      licenciaturaFinal,
      datos.unidadAprendizaje,
    ];

    connection.query(insertar, valores, (error, resultadoFinal) => {
      if (error) {
        console.error("Error al insertar reservación:", error);
        return res
          .status(400)
          .json({ error: "Error al registrar la reservación", detalle: error.sqlMessage });
      }

      res
        .status(200)
        .json({ mensaje: "Reservación registrada con éxito", idReservacion: nuevoID });
    });
  });
};


// 📌 FILTRAR UA'S
export const obtenerUAFiltradas = async (req, res) => {
  const { posgrado, licenciatura, semestre } = req.query;

  let query = `
    SELECT * FROM unidades_aprendizaje 
    WHERE 1 = 1
  `;
  const params = [];

  if (posgrado) {
    query += " AND posgrado = ?";
    params.push(posgrado);
  }

  if (licenciatura) {
    query += " AND licenciatura = ?";
    params.push(licenciatura);
  }

  if (semestre) {
    query += " AND semestre = ?";
    params.push(semestre);
  }

  connection.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};


// OBTENER POSGRADO
export const obtenerPosgrado = async (req, res) => {
  connection.query("SELECT id, nombre FROM posgrados", (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(200).json(results);
  });
};
//OBTENER LICENCIATURA
export const obtenerLicenciaturas = async (req, res) => {
  connection.query("SELECT id, nombre FROM licenciaturas", (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(200).json(results);
  });
};

//OBTENER UNIDAD DE APRENDIZAJE
export const obtenerUA = async (req, res) => {
  connection.query("SELECT * FROM unidades_aprendizaje", (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(200).json(results);
  });
};

// 📌 ACTUALIZAR RESERVACIÓN
export const actualizarReservacion = async (req, res) => {
  const { tipoReservacion, idReservacion } = req.params;

  connection.query(
    "UPDATE reservaciones_salas SET tipo_reservacion = ? WHERE id_reservacion = ?",
    [tipoReservacion, idReservacion],
    (err, results) => {
      if (err) {
        console.error("❌ Error al actualizar reservación:", err);
        return res.status(500).json({ error: "Error al actualizar la reservación" });
      }

      res.status(201).json({ "Reservacion actualizada": results.affectedRows });
    }
  );
};

// 📌 ELIMINAR RESERVACIÓN
export const eliminarReservacion = async (req, res) => {
  const { idReservacion } = req.params;
  const userId = req.user.id; // id del usuario de la sesión actual

  const query = `
    DELETE FROM reservaciones_salas
    WHERE id_reservacion = ? AND id_usuario = ?
  `;

  connection.query(query, [idReservacion, userId], (err, results) => {
    if (err) {
      console.error('Error al eliminar reservación:', err);
      return res.status(500).json({ mensaje: "Error al cancelar la reservación" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Reservación no encontrada o no pertenece al usuario" });
    }

    res.status(200).json({ mensaje: "Reservación eliminada correctamente" });
  });
};

export const obtenerReservaciones = async (req, res) => {
  const userId = req.user.id; // id del usuario de la sesión actual

  const query = `
    SELECT r.id_reservacion, r.id_sala, s.nombre AS sala, r.fecha
    FROM reservaciones_salas r
    JOIN salas s ON r.id_sala = s.id
    WHERE r.id_usuario = ?
  `;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error al obtener reservaciones:", error);
      return res.status(500).json({ error: "Error al obtener reservaciones" });
    }

    res.status(200).json(results);
  });
};

